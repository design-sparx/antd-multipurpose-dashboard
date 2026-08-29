import { useRef } from 'react';
import { Alert, Button, Card, Carousel } from 'antd';
import type { Projects } from '../../types';
import { Loader, ProjectsCard } from '../../components';
import { useStylesContext } from '../../contexts';
import { CAROUSEL_PROPS } from './default-data';

interface ProjectCarouselCardProps {
  title: string;
  filterStatus: (project: Projects) => boolean;
  projectsData: Projects[];
  projectsError: string | undefined;
  projectsLoading: boolean;
}

export const ProjectCarouselCard = ({
  title,
  filterStatus,
  projectsData,
  projectsError,
  projectsLoading,
}: ProjectCarouselCardProps) => {
  const stylesContext = useStylesContext();
  const sliderRef = useRef<any>(null);

  const filteredProjects = projectsData
    .filter(filterStatus)
    .slice(0, 4);

  return (
    <Card
      title={title}
      extra={<Button>View all</Button>}
      variant="borderless"
      style={{ height: '100%' }}
    >
      {projectsError ? (
        <Alert
          title="Error"
          description={projectsError.toString()}
          type="error"
          showIcon
        />
      ) : projectsLoading ? (
        <Loader />
      ) : (
        <Carousel
          ref={sliderRef}
          {...stylesContext?.carouselProps}
          {...CAROUSEL_PROPS}
        >
          {filteredProjects.map((o: Projects) => (
            <ProjectsCard
              key={o.project_id}
              project={o}
              size="small"
              style={{ margin: `0 8px` }}
            />
          ))}
        </Carousel>
      )}
    </Card>
  );
};
