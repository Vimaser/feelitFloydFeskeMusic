import SuspenseWrapper from './SuspenseWrapper';
import HomePage from './page';

const HomePageWrapper = () => {
  return (
    <SuspenseWrapper>
      <HomePage />
    </SuspenseWrapper>
  );
};

export default HomePageWrapper;
