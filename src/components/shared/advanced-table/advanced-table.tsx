import { useState } from 'react';
import {
  Table,
  TableProps,
  Card,
  Button,
  Dropdown,
  MenuProps,
  Space,
} from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { exportToCSV, exportToJSON } from '../../../utils';

interface AdvancedTableProps<T extends object> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
  rowKey?: string | ((record: T) => string);
  rowSelection?: TableProps<T>['rowSelection'];
  paginated?: boolean;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onSort?: (field: string, order: 'ascend' | 'descend' | null) => void;
  onFilter?: (filters: Record<string, FilterValue | null>) => void;
  exportable?: boolean;
  exportFilename?: string;
  refreshable?: boolean;
  onRefresh?: () => void;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  scroll?: TableProps<T>['scroll'];
  virtual?: boolean;
}

export function AdvancedTable<T extends object>({
  columns,
  dataSource,
  loading,
  rowKey = 'id',
  rowSelection,
  paginated = true,
  pageSize = 10,
  total,
  onPageChange,
  onSort,
  onFilter,
  exportable = true,
  exportFilename = 'export',
  refreshable = false,
  onRefresh,
  title,
  extra,
  scroll,
  virtual = false,
}: AdvancedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizeState, setPageSizeState] = useState(pageSize);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[]
  ) => {
    if (paginated) {
      setCurrentPage(pagination.current || 1);
      setPageSizeState(pagination.pageSize || pageSize);
      onPageChange?.(pagination.current || 1, pagination.pageSize || pageSize);
    }

    if (onSort && !Array.isArray(sorter)) {
      onSort(
        sorter.field as string,
        sorter.order as 'ascend' | 'descend' | null
      );
    }

    if (onFilter) {
      onFilter(filters);
    }
  };

  const paginationConfig: TablePaginationConfig | false = paginated
    ? {
        current: currentPage,
        pageSize: pageSizeState,
        total: total || dataSource.length,
        showSizeChanger: true,
        showTotal: (totalItems) => `Total ${totalItems} items`,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: (page, size) => {
          setCurrentPage(page);
          setPageSizeState(size);
          onPageChange?.(page, size);
        },
      }
    : false;

  const handleExportCSV = () => {
    const exportData = dataSource as unknown as Record<string, unknown>[];
    const cols = columns as Array<{ title?: string; dataIndex?: string }>;
    const exportCols = cols
      .filter((col) => col.dataIndex)
      .map((col) => ({
        title: col.title as string,
        dataIndex: col.dataIndex as string,
      }));
    exportToCSV(exportData, exportFilename, exportCols);
  };

  const exportItems: MenuProps['items'] = [
    {
      key: 'csv',
      label: 'Export as CSV',
      onClick: handleExportCSV,
    },
    {
      key: 'json',
      label: 'Export as JSON',
      onClick: () =>
        exportToJSON(dataSource as unknown as object[], exportFilename),
    },
  ];

  const tableExtra = (
    <Space>
      {refreshable && onRefresh && (
        <Button icon={<ReloadOutlined />} onClick={onRefresh}>
          Refresh
        </Button>
      )}
      {exportable && (
        <Dropdown menu={{ items: exportItems }} trigger={['click']}>
          <Button icon={<DownloadOutlined />}>Export</Button>
        </Dropdown>
      )}
      {extra}
    </Space>
  );

  return (
    <Card title={title} extra={tableExtra} bodyStyle={{ padding: 0 }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={rowKey}
        rowSelection={rowSelection}
        pagination={paginationConfig}
        onChange={handleTableChange}
        scroll={scroll || (virtual ? { y: 400, x: 'max-content' } : undefined)}
        virtual={virtual}
      />
    </Card>
  );
}
