import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import PetrolStationTable from "../../components/petrol-station/PetrolStationTable/PetrolStationTable";

export const PetrolStationList = () => {
  return (
    <PageLayout>
      <PageLayout.Title>АЗС</PageLayout.Title>
      <PageLayout.Content>
        <PetrolStationTable />
      </PageLayout.Content>
    </PageLayout>
  );
}
