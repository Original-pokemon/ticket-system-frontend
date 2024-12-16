import PageLayout from "../../components/layouts/PageLayout/PageLayout";
import { CategoryTable } from "../../components/category/CategoryTable";

export const CategoriesList = () => {
  return (
    <PageLayout>
      <PageLayout.Title>Категории</PageLayout.Title>
      <PageLayout.Content>
        <CategoryTable />
      </PageLayout.Content>
    </PageLayout>
  );
}
