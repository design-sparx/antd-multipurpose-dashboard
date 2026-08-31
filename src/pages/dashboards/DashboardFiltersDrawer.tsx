import { Button, Checkbox, DatePicker, Drawer, Flex, Slider, Typography } from 'antd';

interface DashboardFiltersDrawerProps {
  filterOpen: boolean;
  onClose: () => void;
}

export const DashboardFiltersDrawer = ({
  filterOpen,
  onClose,
}: DashboardFiltersDrawerProps) => {
  return (
    <Drawer
      title="Dashboard Filters"
      placement="right"
      onClose={onClose}
      open={filterOpen}
      size={320}
      styles={{
        body: { padding: 16 },
      }}
    >
      <Flex vertical gap="large">
        <Flex vertical gap="small">
          <Typography.Text strong>Date Range</Typography.Text>
          <DatePicker.RangePicker style={{ width: '100%' }} />
        </Flex>

        <Flex vertical gap="small">
          <Typography.Text strong>Project Status</Typography.Text>
          <Checkbox.Group>
            <Flex vertical>
              <Checkbox value="in progress">In Progress</Checkbox>
              <Checkbox value="completed">Completed</Checkbox>
              <Checkbox value="on hold">On Hold</Checkbox>
            </Flex>
          </Checkbox.Group>
        </Flex>

        <Flex vertical gap="small">
          <Typography.Text strong>Task Priority</Typography.Text>
          <Slider range defaultValue={[20, 50]} />
        </Flex>

        <Button type="primary" block onClick={onClose}>
          Apply Filters
        </Button>
      </Flex>
    </Drawer>
  );
};
