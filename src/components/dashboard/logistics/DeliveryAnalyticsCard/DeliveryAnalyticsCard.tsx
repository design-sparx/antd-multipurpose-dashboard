import { Alert, CardProps } from 'antd';
import { Column } from '@ant-design/charts';
import { DeliveryAnalytics } from '../../../../types';
import { ReactNode, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { Card, Loader } from '../../../index.ts';

type ChartProps = {
  data: DeliveryAnalytics[];
};

const MultiLineChart = ({ data }: ChartProps) => {
  const [refinedData, setRefinedData] = useState<DeliveryAnalytics[]>([]);

  useEffect(() => {
    const formattedData = _.sortBy(data, (item) => {
      // Map the month names to their corresponding numerical values for sorting
      const monthMap: { [key: string]: number } = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };
      // Use the numerical value for sorting
      return monthMap[item.month];
    });
    setRefinedData(formattedData);
  }, [data]);

  const config = {
    data: refinedData,
    isStack: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'status',
    radius: 0.2,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'top', // 'top', 'bottom', 'middle',
      offset: 10,
      style: {
        fill: 'transparent',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    connectedArea: {
      style: (oldStyle: any) => {
        return {
          fill: 'rgba(0,0,0,0.25)',
          stroke: oldStyle.fill,
          lineWidth: 0.5,
        };
      },
    },
    slider: {
      start: 0,
      end: 0.5,
    },
    barStyle: {
      lineCap: 'round',
    },
  };

  // @ts-ignore
  return <Column {...config} />;
};

type Props = {
  data?: DeliveryAnalytics[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const DeliveryAnalyticsCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {
  return (
    <Card title="Analytics" {...others}>
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <MultiLineChart data={data || []} />
      )}
    </Card>
  );
};
