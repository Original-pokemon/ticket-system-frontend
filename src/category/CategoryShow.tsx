import {
  Show,
  TextField,
  ReferenceManyField,
  DateField,
  ReferenceField,
  SimpleShowLayout,
  useRecordContext,
  Count,
  FieldTitle,
  Datagrid,
  List,
  ReferenceInput,
  ChipField,
  useShowContext,
  useShowController,
  DatagridBody,
  useGetRecordId,
} from "react-admin";
import { Box } from "@mui/material";


const filters = [
  <ReferenceInput source="petrol_stations" reference="petrol-station" alwaysOn />,
  <ReferenceInput source="ticket_status" reference="status" alwaysOn />,
  <ReferenceInput source="ticket_priority" reference="priority" alwaysOn />,
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
          <ReferenceField source="ticket_priority" reference="priority" label="Приоритет" >
            <ChipField source="description" />
          </ReferenceField>
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