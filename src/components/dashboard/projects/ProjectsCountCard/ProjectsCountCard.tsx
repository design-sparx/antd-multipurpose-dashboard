import {
  Card,
  CardProps,
  Col,
  Progress,
  ProgressProps,
  Row,
  Space,
  SpaceProps,
  Statistic,
  Tooltip,
} from 'antd';
import ProjectsData from '../../../../../public/mocks/Projects.json';
import './styles.scss';

const PROGRESS_PROPS: ProgressProps = {
  type: 'circle',
  showInfo: false,
  size: 24,
  style: {
    paddingBottom: '.35rem',
  },
};

const SPACE_PROPS: SpaceProps = {
  align: 'end',
};

type Props = CardProps;

const ProjectsCountCard = ({ ...others }: Props) => {
  const completed = ProjectsData.filter((_) => _.status === 'completed'),
    inProgress = ProjectsData.filter((_) => _.status === 'in progress'),
    onHold = ProjectsData.filter((_) => _.status === 'on hold');

  return (
    <Card
      title="Project stats"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80%',
      }}
      className="card"
      style={{
        height: '100%',
      }}
      {...others}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Space {...SPACE_PROPS}>
            <Statistic title="Active" value={inProgress.length} />
            <Tooltip
              title={`${inProgress.length} / ${ProjectsData.length} active`}
            >
              <Progress
                percent={Number(
                  ((inProgress.length / ProjectsData.length) * 100).toFixed(2)
                )}
                {...PROGRESS_PROPS}
              />
            </Tooltip>
          </Space>
        </Col>
        <Col span={8}>
          <Space {...SPACE_PROPS}>
            <Statistic title="On Hold" value={onHold.length} />
            <Tooltip
              title={`${onHold.length} / ${ProjectsData.length} on hold`}
            >
              <Progress
                percent={Number(
                  ((onHold.length / ProjectsData.length) * 100).toFixed(2)
                )}
                {...PROGRESS_PROPS}
              />
            </Tooltip>
          </Space>
        </Col>
        <Col span={8}>
          <Space {...SPACE_PROPS}>
            <Statistic title="Completed" value={completed.length} />
            <Tooltip
              title={`${completed.length} / ${ProjectsData.length} completed`}
            >
              <Progress
                percent={Number(
                  ((completed.length / ProjectsData.length) * 100).toFixed(2)
                )}
                {...PROGRESS_PROPS}
              />
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectsCountCard;
