import SuspenseWrapper from '../../SuspenseWrapper';
import AdminShows from './page';

const AdminShowsPageWrapper = () => {
  return (
    <SuspenseWrapper>
      <AdminShows />
    </SuspenseWrapper>
  );
};

export default AdminShowsPageWrapper;
