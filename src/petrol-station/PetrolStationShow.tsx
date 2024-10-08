import { Datagrid, DateField, List, ReferenceArrayField, ReferenceField, ReferenceInput, Show, SimpleShowLayout, TextField, useGetRecordId, useRecordContext } from "react-admin";
import { Box } from "@mui/material";

const filters = [
  <ReferenceInput source="status_id" reference="status" alwaysOn />,
];

export const PetrolStationShow = () => {
  return (
    <Show aside={<ManagersSidebar />} >
      <SimpleShowLayout>
        <List filters={filters} resource="ticket" filter={{ petrol_station_id: useGetRecordId() }} sort={{ field: "created_at", order: "DESC" }}>
          <Datagrid bulkActionButtons={false} rowClick="show">
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
}



const ManagersSidebar = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout >
      <ReferenceArrayField label='Привязанные Менеджеры' source="managers" reference="manager">
        <Datagrid bulkActionButtons={false} sort={{ field: "user.created_at", order: "DESC" }}>
          <TextField source="user.user_name" label="Менеджер" />
          <ReferenceField source="bush_id" reference="bush" label="Куст" />
          <DateField source="user.created_at" label="Создан" />
        </Datagrid>
      </ReferenceArrayField>
    </SimpleShowLayout>
  );
};