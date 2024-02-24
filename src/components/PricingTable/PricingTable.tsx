import { Pricing } from '../../types';
import {
  Alert,
  Card as AntdCard,
  CardProps,
  Col,
  List,
  Row,
  Segmented,
  Space,
  theme,
  Typography,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Card, Loader } from '../index.ts';
import { ReactNode, useState } from 'react';
import { useStylesContext } from '../../context';
import CountUp from 'react-countup';

const textStyles = (
  preferred?: boolean,
  primary?: string
): React.CSSProperties => {
  return {
    color: preferred ? 'white' : primary ? primary : 'initial',
    textTransform: 'capitalize',
    textAlign: 'center',
  };
};

type Props = {
  data?: Pricing[];
  error?: ReactNode;
  loading?: boolean;
} & CardProps;

const PricingTable = ({ data, error, loading, ...others }: Props) => {
  const {
    token: { colorPrimary, colorFillSecondary },
  } = theme.useToken();
  const [value, setValue] = useState<'monthly' | 'annually' | string | number>(
    'monthly'
  );
  const stylesContext = useStylesContext();

  return (
    <Card
      title="Pricing"
      actions={[
        <Typography.Text italic>
          Note: All plans come with a 30-day money-back guarantee.
        </Typography.Text>,
      ]}
      {...others}
    >
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
        <>
          <div
            className="text-capitalize text-center"
            style={{ marginBottom: '1rem' }}
          >
            <Segmented
              size="large"
              options={['monthly', 'annually']}
              value={value}
              onChange={setValue}
            />
          </div>
          <Row {...stylesContext?.rowProps}>
            {data?.map((d, i) => (
              <Col sm={24} lg={8} key={`${d.color}-${i}`}>
                <AntdCard
                  style={{
                    background: d.preferred ? colorPrimary : colorFillSecondary,
                    border: `1px solid ${
                      d.preferred ? colorPrimary : colorFillSecondary
                    }`,
                  }}
                >
                  <Typography.Text
                    strong
                    style={{
                      ...textStyles(d.preferred, colorPrimary),
                      fontSize: 16,
                    }}
                  >
                    {d.plan}
                  </Typography.Text>
                  <Typography.Title
                    style={{ margin: '1rem 0', ...textStyles(d.preferred) }}
                  >
                    ${' '}
                    <CountUp
                      decimals={2}
                      end={value === 'monthly' ? d.monthly : d.annually}
                    />
                    /
                    <small
                      style={{
                        fontSize: 16,
                        fontWeight: 400,
                        textTransform: 'lowercase',
                      }}
                    >
                      per {value === 'monthly' ? 'month' : 'year'}
                    </small>
                  </Typography.Title>
                  <List
                    header={
                      <Typography.Text style={textStyles(d.preferred)}>
                        Features
                      </Typography.Text>
                    }
                    dataSource={d.features}
                    renderItem={(item) => (
                      <List.Item>
                        <Space>
                          <CheckCircleOutlined
                            style={textStyles(d.preferred)}
                          />
                          <Typography.Text style={textStyles(d.preferred)}>
                            {item}
                          </Typography.Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </AntdCard>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Card>
  );
};

export default PricingTable;
