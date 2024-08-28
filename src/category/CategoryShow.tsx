import {
  Show,
  TextField,
  ReferenceManyField,
  DateField,
  ReferenceField,
  SimpleShowLayout,
  useRecordContext,
  Datagrid,
  List,
  ReferenceInput,
  ChipField,
  useGetRecordId,
} from "react-admin";
import { Box } from "@mui/material";


const filters = [
  <ReferenceInput source="status_id" reference="status" alwaysOn />,
];

export const CategoryShow = () => (
  <Show aside={<TaskPerformersSidebar />}>
    <SimpleShowLayout>
      <List filters={filters} resource="ticket" filter={{ ticket_category: useGetRecordId() }}>
        <Datagrid bulkActionButtons={false} rowClick="show" title="Задачи" >
          <TextField source="title" label="Название" />
          <ReferenceField source="petrol_station_id" reference="petrol-station" label="АЗС" />
          <ReferenceField source="status_id" reference="status" label="Статус" >
            <ChipField source="description" />
          </ReferenceField>
          <DateField source="deadline" label="Заявленная дата исполнения" />
          <DateField source="created_at" label="Создан" />
        </Datagrid>
      </List>
    </SimpleShowLayout>
  </Show >
);

const TaskPerformersSidebar = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout >
      <ReferenceManyField label='Исполнители для катигории' reference="task-performer" target="category_id">
        <Datagrid bulkActionButtons={false} sort={{ field: "user.created_at", order: "DESC" }}>
          <TextField source="user.user_name" label="Исполнитель" />
          <ReferenceField source="bush_id" reference="bush" label="Куст" >
            <ChipField source="description" />
          </ReferenceField>
          <DateField source="user.created_at" label="Создан" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  );
};