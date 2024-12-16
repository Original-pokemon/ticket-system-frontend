import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import ManagerTable from "../../components/manager/ManagerTable/ManagerTable";

const ManagersList = () => {
  return (
    <PageLayout>
      <PageLayout.Title>Менеджеры</PageLayout.Title>
      <PageLayout.Content>
        <ManagerTable />
      </PageLayout.Content>
    </PageLayout>
  );
}

export default ManagersList