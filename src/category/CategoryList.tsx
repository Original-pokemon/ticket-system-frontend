import {
  ChipField,
  Datagrid,
  List,
  ReferenceManyCount,
  TextField,
} from "react-admin";

export const CategoryList = () => (
  <List
    sort={{ field: "description", order: "ASC" }}
  >
    <Datagrid
      rowClick="show"
      bulkActionButtons={false}
    >
      <ChipField source="description" />
      <ReferenceManyCount
        label="Исполнители"
        reference="task-performer"
        target="id"
      />
      <ReferenceManyCount
        label="Задачи"
        reference="ticket"
        target="ticket_category"
      />
    </Datagrid>
  </List>
);
