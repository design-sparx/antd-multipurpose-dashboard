import { Alert, Card as AntCard, Col, Row, Typography } from 'antd';
import { Card, Loader } from '../../components';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';

export const CorporateLicensePage = () => {
  const stylesContext = useStylesContext();
  const {
    data: licenseData,
    error: licenseDataError,
    loading: licenseDataLoading,
  } = useFetchData('../mocks/License.json');

  return (
    <div>
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <Card title="licence comparisons">
            {licenseDataError ? (
              <Alert
                message="Error"
                description={licenseDataError.toString()}
                type="error"
                showIcon
              />
            ) : licenseDataLoading ? (
              <Loader />
            ) : (
              licenseData.map((l: any) => (
                <AntCard
                  title={`${l.title} plan license`}
                  bordered={true}
                  style={{ marginBottom: '1rem' }}
                >
                  <Typography.Text>{l.description}</Typography.Text>
                </AntCard>
              ))
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card title="general terms and conditions">
            <ul>
              <li>
                All licenses are subject to adherence to the terms of service
                and acceptable use policies outlined by the provider.
              </li>
              <li>
                Users must not remove or alter any copyright notices or branding
                present in the template.
              </li>
              <li>
                Users are responsible for the content and data they upload or
                display using the dashboard template.
              </li>
              <li>
                The provider reserves the right to terminate the license in case
                of violation of terms or misuse of the template.
              </li>
              <li>
                Refunds are subject to the refund policy of the provider and are
                applicable within the specified period after the purchase.
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
