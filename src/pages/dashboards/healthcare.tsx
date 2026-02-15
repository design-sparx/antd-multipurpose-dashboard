import { useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Row,
  Slider,
  Typography,
  Avatar,
  Tag,
  Badge,
  Progress,
} from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
  FilterOutlined,
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { PageHeader, Loader, Card } from '../../components/shared';
import { useFetchData } from '../../hooks';
import { Patient, Appointment, Doctor, Department } from '../../types';
import CountUp from 'react-countup';

const HealthcareDashboard = () => {
  const stylesContext = useStylesContext();
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    data: patientsDataRaw,
    error: patientsError,
    loading: patientsLoading,
  } = useFetchData<Patient[]>('/antd/patients');

  const {
    data: appointmentsDataRaw,
    error: appointmentsError,
    loading: appointmentsLoading,
  } = useFetchData<Appointment[]>('/antd/appointments');

  const {
    data: doctorsDataRaw,
    error: doctorsError,
    loading: doctorsLoading,
  } = useFetchData<Doctor[]>('/antd/doctors');

  const {
    data: departmentsDataRaw,
    error: departmentsError,
    loading: departmentsLoading,
  } = useFetchData<Department[]>('/antd/departments');

  const patientsData = patientsDataRaw ?? [];
  const appointmentsData = appointmentsDataRaw ?? [];
  const doctorsData = doctorsDataRaw ?? [];
  const departmentsData = departmentsDataRaw ?? [];

  const criticalPatients = patientsData.filter(
    (p) => p.status === 'Critical'
  ).length;
  const todayAppointments = appointmentsData.length;
  const activePatients = patientsData.filter(
    (p) => p.status === 'Active' || p.status === 'Recovering'
  ).length;

  return (
    <div>
      <Helmet>
        <title>Healthcare Dashboard</title>
      </Helmet>
      <PageHeader
        title="healthcare dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboards</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          {
            title: 'healthcare',
          },
        ]}
        extra={[
          <Button
            key="filter"
            icon={<FilterOutlined />}
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </Button>,
        ]}
      />

      <Row {...stylesContext?.rowProps}>
        <Col xs={24} lg={18}>
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} md={24}>
              <Row {...stylesContext?.rowProps}>
                <Col xs={24} lg={16}>
                  <Card>
                    <Flex vertical gap="middle">
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        Welcome to Healthcare Dashboard
                      </Typography.Title>
                      <Typography.Paragraph
                        type="secondary"
                        style={{ margin: 0 }}
                      >
                        Monitor patient health, appointments, and hospital
                        operations.
                      </Typography.Paragraph>
                      <Flex gap="middle">
                        <Card style={{ flex: 1, textAlign: 'center' }}>
                          <Typography.Title
                            level={3}
                            style={{ margin: 0, color: '#1890ff' }}
                          >
                            <CountUp end={6} />
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Departments
                          </Typography.Text>
                        </Card>
                        <Card style={{ flex: 1, textAlign: 'center' }}>
                          <Typography.Title
                            level={3}
                            style={{ margin: 0, color: '#52c41a' }}
                          >
                            <CountUp end={24} />
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Doctors
                          </Typography.Text>
                        </Card>
                        <Card style={{ flex: 1, textAlign: 'center' }}>
                          <Typography.Title
                            level={3}
                            style={{ margin: 0, color: '#722ed1' }}
                          >
                            <CountUp end={150} />+
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Beds
                          </Typography.Text>
                        </Card>
                      </Flex>
                    </Flex>
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Row {...stylesContext?.rowProps}>
                    <Col xs={12} lg={24}>
                      <Card>
                        <Flex vertical align="center" gap="small">
                          <UserOutlined
                            style={{ fontSize: 24, color: '#1890ff' }}
                          />
                          <Typography.Title level={3} style={{ margin: 0 }}>
                            <CountUp end={1234} />
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Total Patients
                          </Typography.Text>
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={12} lg={24}>
                      <Card>
                        <Flex vertical align="center" gap="small">
                          <CalendarOutlined
                            style={{ fontSize: 24, color: '#52c41a' }}
                          />
                          <Typography.Title level={3} style={{ margin: 0 }}>
                            <CountUp end={todayAppointments} />
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Today's Appointments
                          </Typography.Text>
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={12} lg={24}>
                      <Card>
                        <Flex vertical align="center" gap="small">
                          <MedicineBoxOutlined
                            style={{ fontSize: 24, color: '#faad14' }}
                          />
                          <Typography.Title level={3} style={{ margin: 0 }}>
                            <CountUp end={activePatients} />
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Active Patients
                          </Typography.Text>
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={12} lg={24}>
                      <Card>
                        <Flex vertical align="center" gap="small">
                          <AlertOutlined
                            style={{ fontSize: 24, color: '#f5222d' }}
                          />
                          <Typography.Title level={3} style={{ margin: 0 }}>
                            <CountUp end={criticalPatients} />
                          </Typography.Title>
                          <Typography.Text type="secondary">
                            Critical Cases
                          </Typography.Text>
                        </Flex>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title="Today's Appointments"
                extra={<Button type="link">View All</Button>}
              >
                {appointmentsError ? (
                  <Typography.Text type="danger">
                    Error loading appointments
                  </Typography.Text>
                ) : appointmentsLoading ? (
                  <Loader />
                ) : (
                  <Flex vertical gap="small">
                    {appointmentsData.slice(0, 5).map((apt) => (
                      <Flex
                        key={apt.id}
                        justify="space-between"
                        align="middle"
                        style={{
                          padding: '8px 0',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        <Flex vertical gap={4}>
                          <Typography.Text strong>
                            {apt.patient_name}
                          </Typography.Text>
                          <Typography.Text
                            type="secondary"
                            style={{ fontSize: 12 }}
                          >
                            {apt.doctor}
                          </Typography.Text>
                        </Flex>
                        <Flex vertical align="end" gap={4}>
                          <Tag
                            color={
                              apt.status === 'Completed'
                                ? 'green'
                                : apt.status === 'In Progress'
                                  ? 'blue'
                                  : 'default'
                            }
                          >
                            {apt.status}
                          </Tag>
                          <Typography.Text
                            type="secondary"
                            style={{ fontSize: 12 }}
                          >
                            {apt.time}
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                )}
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card
                title="Department Occupancy"
                extra={<Button type="link">View All</Button>}
              >
                {departmentsError ? (
                  <Typography.Text type="danger">
                    Error loading departments
                  </Typography.Text>
                ) : departmentsLoading ? (
                  <Loader />
                ) : (
                  <Flex vertical gap="middle">
                    {departmentsData.map((dept) => (
                      <Flex key={dept.id} vertical gap={4}>
                        <Flex justify="space-between">
                          <Typography.Text strong>{dept.name}</Typography.Text>
                          <Typography.Text>{dept.occupancy}%</Typography.Text>
                        </Flex>
                        <Progress
                          percent={dept.occupancy}
                          strokeColor={dept.color}
                          showInfo={false}
                          size="small"
                        />
                      </Flex>
                    ))}
                  </Flex>
                )}
              </Card>
            </Col>

            <Col xs={24}>
              <Card
                title="Patient Records"
                extra={<Button type="link">View All</Button>}
              >
                {patientsError ? (
                  <Typography.Text type="danger">
                    Error loading patients
                  </Typography.Text>
                ) : patientsLoading ? (
                  <Loader />
                ) : (
                  <Row gutter={[16, 16]}>
                    {patientsData.slice(0, 6).map((patient) => (
                      <Col xs={24} sm={12} lg={8} key={patient.id}>
                        <Card size="small">
                          <Flex vertical gap="small">
                            <Flex justify="space-between" align="middle">
                              <Flex align="middle" gap="small">
                                <Avatar style={{ backgroundColor: '#1890ff' }}>
                                  {patient.name.charAt(0)}
                                </Avatar>
                                <Flex vertical>
                                  <Typography.Text strong>
                                    {patient.name}
                                  </Typography.Text>
                                  <Typography.Text
                                    type="secondary"
                                    style={{ fontSize: 12 }}
                                  >
                                    {patient.age} years • {patient.gender}
                                  </Typography.Text>
                                </Flex>
                              </Flex>
                              <Tag
                                color={
                                  patient.status === 'Critical'
                                    ? 'red'
                                    : patient.status === 'Active'
                                      ? 'blue'
                                      : patient.status === 'Recovering'
                                        ? 'orange'
                                        : 'green'
                                }
                              >
                                {patient.status}
                              </Tag>
                            </Flex>
                            <Typography.Text
                              type="secondary"
                              style={{ fontSize: 12 }}
                            >
                              {patient.condition}
                            </Typography.Text>
                            <Flex justify="space-between">
                              <Typography.Text
                                type="secondary"
                                style={{ fontSize: 12 }}
                              >
                                <ClockCircleOutlined /> {patient.room}
                              </Typography.Text>
                              <Typography.Text
                                type="secondary"
                                style={{ fontSize: 12 }}
                              >
                                {patient.doctor}
                              </Typography.Text>
                            </Flex>
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card>
            </Col>

            <Col xs={24}>
              <Card
                title="Hospital Staff"
                extra={<Button type="link">View All</Button>}
              >
                {doctorsError ? (
                  <Typography.Text type="danger">
                    Error loading doctors
                  </Typography.Text>
                ) : doctorsLoading ? (
                  <Loader />
                ) : (
                  <Row gutter={[16, 16]}>
                    {doctorsData.slice(0, 6).map((doctor) => (
                      <Col xs={24} sm={12} lg={8} xl={4} key={doctor.id}>
                        <Card size="small">
                          <Flex vertical align="center" gap="small">
                            <Avatar
                              size={48}
                              style={{
                                backgroundColor:
                                  doctor.availability === 'Available'
                                    ? '#52c41a'
                                    : doctor.availability === 'Busy'
                                      ? '#faad14'
                                      : '#d9d9d9',
                              }}
                            >
                              {doctor.avatar}
                            </Avatar>
                            <Flex vertical align="center">
                              <Typography.Text strong style={{ fontSize: 12 }}>
                                {doctor.name}
                              </Typography.Text>
                              <Typography.Text
                                type="secondary"
                                style={{ fontSize: 11 }}
                              >
                                {doctor.department}
                              </Typography.Text>
                            </Flex>
                            <Badge
                              status={
                                doctor.availability === 'Available'
                                  ? 'success'
                                  : doctor.availability === 'Busy'
                                    ? 'warning'
                                    : 'default'
                              }
                              text={
                                <Typography.Text
                                  type="secondary"
                                  style={{ fontSize: 11 }}
                                >
                                  {doctor.availability}
                                </Typography.Text>
                              }
                            />
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Card>
            </Col>
          </Row>
        </Col>

        <Col md={24} lg={6}>
          <Row {...stylesContext?.rowProps}>
            <Col span={24}>
              <Card
                title="Quick Stats"
                extra={<Button type="link">Details</Button>}
              >
                <Flex vertical gap="middle">
                  <Flex justify="space-between" align="middle">
                    <Typography.Text>Total Patients</Typography.Text>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      1,234
                    </Typography.Title>
                  </Flex>
                  <Flex justify="space-between" align="middle">
                    <Typography.Text>Admitted Today</Typography.Text>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      12
                    </Typography.Title>
                  </Flex>
                  <Flex justify="space-between" align="middle">
                    <Typography.Text>Discharged Today</Typography.Text>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      8
                    </Typography.Title>
                  </Flex>
                  <Flex justify="space-between" align="middle">
                    <Typography.Text>Bed Occupancy</Typography.Text>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                      78%
                    </Typography.Title>
                  </Flex>
                </Flex>
              </Card>
            </Col>

            <Col span={24}>
              <Card title="Upcoming Surgeries">
                <Flex vertical gap="small">
                  <Flex
                    justify="space-between"
                    align="middle"
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <Flex vertical gap={2}>
                      <Typography.Text strong>Heart Bypass</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 12 }}
                      >
                        Dr. Michael Chen
                      </Typography.Text>
                    </Flex>
                    <Tag color="red">2:00 PM</Tag>
                  </Flex>
                  <Flex
                    justify="space-between"
                    align="middle"
                    style={{
                      padding: '8px 0',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <Flex vertical gap={2}>
                      <Typography.Text strong>Appendectomy</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 12 }}
                      >
                        Dr. James Taylor
                      </Typography.Text>
                    </Flex>
                    <Tag color="orange">4:30 PM</Tag>
                  </Flex>
                  <Flex justify="space-between" align="middle">
                    <Flex vertical gap={2}>
                      <Typography.Text strong>Knee Replacement</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 12 }}
                      >
                        Dr. Lisa Anderson
                      </Typography.Text>
                    </Flex>
                    <Tag color="blue">Next Day</Tag>
                  </Flex>
                </Flex>
              </Card>
            </Col>

            <Col span={24}>
              <Card title="Recent Activity">
                <Flex vertical gap="small">
                  <Flex align="middle" gap="small">
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                    <Flex vertical>
                      <Typography.Text>Patient discharged</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 11 }}
                      >
                        Alice Brown - 10 min ago
                      </Typography.Text>
                    </Flex>
                  </Flex>
                  <Flex align="middle" gap="small">
                    <AlertOutlined style={{ color: '#f5222d' }} />
                    <Flex vertical>
                      <Typography.Text>New emergency admission</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 11 }}
                      >
                        Diana Martinez - 25 min ago
                      </Typography.Text>
                    </Flex>
                  </Flex>
                  <Flex align="middle" gap="small">
                    <CalendarOutlined style={{ color: '#1890ff' }} />
                    <Flex vertical>
                      <Typography.Text>Appointment completed</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 11 }}
                      >
                        Jane Smith - 1 hour ago
                      </Typography.Text>
                    </Flex>
                  </Flex>
                  <Flex align="middle" gap="small">
                    <MedicineBoxOutlined style={{ color: '#722ed1' }} />
                    <Flex vertical>
                      <Typography.Text>Prescription updated</Typography.Text>
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 11 }}
                      >
                        Bob Johnson - 2 hours ago
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        title="Dashboard Filters"
        placement="right"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
        width={320}
        styles={{ body: { padding: 16 } }}
      >
        <Flex vertical gap="large">
          <Flex vertical gap="small">
            <Typography.Text strong>Date Range</Typography.Text>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Department</Typography.Text>
            <Checkbox.Group>
              <Flex vertical>
                <Checkbox value="emergency">Emergency</Checkbox>
                <Checkbox value="cardiology">Cardiology</Checkbox>
                <Checkbox value="neurology">Neurology</Checkbox>
                <Checkbox value="pediatrics">Pediatrics</Checkbox>
              </Flex>
            </Checkbox.Group>
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Patient Status</Typography.Text>
            <Checkbox.Group>
              <Flex vertical>
                <Checkbox value="active">Active</Checkbox>
                <Checkbox value="recovering">Recovering</Checkbox>
                <Checkbox value="critical">Critical</Checkbox>
              </Flex>
            </Checkbox.Group>
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Bed Occupancy Range</Typography.Text>
            <Slider range defaultValue={[20, 90]} />
          </Flex>

          <Button type="primary" block onClick={() => setFilterOpen(false)}>
            Apply Filters
          </Button>
        </Flex>
      </Drawer>
    </div>
  );
};

export default HealthcareDashboard;
