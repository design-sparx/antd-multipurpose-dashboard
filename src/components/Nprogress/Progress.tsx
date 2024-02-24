import { useNProgress } from '@tanem/react-nprogress';
import { Bar, Container, Nspinner } from './index.ts';

type Props = {
  isAnimating?: boolean;
};

const Progress = ({ isAnimating }: Props) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      <Nspinner />
      {/*
              This example doesn't use a spinner component so the UI stays
              tidy. You're free to render whatever is appropriate for your
              use-case.
              */}
    </Container>
  );
};

export default Progress;
