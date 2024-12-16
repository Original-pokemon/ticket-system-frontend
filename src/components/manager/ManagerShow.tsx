import {
  Show,
  TextField,
  DateField,
  ReferenceField,
  SimpleShowLayout,
  useRecordContext,
  Datagrid,
  ReferenceArrayField,
  ReferenceInput,
  List,
  useShowController,
} from "react-admin";
import { Box } from "@mui/material";

const filters = [
  <ReferenceInput source="status_id" reference="status" alwaysOn />,
];


export const ManagerShow = () => {
  const { record } = useShowController();

  if (!record) return null

  return (
    <Show aside={<ManagersSidebar />}>
      <SimpleShowLayout>
        <List filters={filters} resource="ticket" filter={{ petrol_station_id: record.petrol_stations }}>
          <Datagrid bulkActionButtons={false} rowClick="show" title="Задачи"  >
            <TextField source="title" label="Название" />
            <ReferenceField source="status_id" reference="status" label="Статус" />
            <DateField source="deadline" label="Заявленная дата исполнения" />
            <ReferenceField source="petrol_station_id" reference="petrol-station" label="АЗС" />
            <DateField source="created_at" label="Создан" />
          </Datagrid>
        </List>
      </SimpleShowLayout>
    </Show >
  );
};

const ManagersSidebar = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout >
      <ReferenceArrayField label='Привязанные АЗС' source="petrol_stations" reference="petrol-station">
        <Datagrid bulkActionButtons={false} sort={{ field: "user.created_at", order: "DESC" }}>
          <TextField source="user.user_name" label="АЗС" />
          <ReferenceField source="bush_id" reference="bush" label="Куст" />
          <DateField source="user.created_at" label="Создан" />
        </Datagrid>
      </ReferenceArrayField>
    </SimpleShowLayout>
  );
};
