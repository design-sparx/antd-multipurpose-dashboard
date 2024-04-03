import { Alert, Col, List, Row } from 'antd';
import { Card, EmployeeCard } from '../../components';
import { Employee } from '../../types';
import { useFetchData } from '../../hooks';
import { useStylesContext } from '../../context';

export const CorporateTeamPage = () => {
  const stylesContext = useStylesContext();
  const {
    data: employeesData,
    loading: employeesDataLoading,
    error: employeesDataError,
  } = useFetchData('../mocks/Employees.json');

  return (
    <div>
      <Row {...stylesContext?.rowProps}>
        <Col span={24}>
          <Card title="Our team">
            {employeesDataError ? (
              <Alert
                message="Error"
                description={employeesDataError.toString()}
                type="error"
                showIcon
              />
            ) : (
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 3,
                  xl: 4,
                  xxl: 4,
                }}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 10,
                  align: 'center',
                }}
                loading={employeesDataLoading}
                dataSource={employeesData}
                renderItem={(item: Employee) => (
                  <List.Item key={item.employee_id}>
                    <EmployeeCard data={item} showInfo={true} />
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
