import {
  ChipField,
  Datagrid,
  DateField,
  List,
  ReferenceField,
  ReferenceInput,
  ReferenceManyCount,
  TextField,
} from "react-admin";

const filters = [
  <ReferenceInput source="ticket_category" reference="category" alwaysOn />,
  <ReferenceInput source="ticket_status" reference="status" alwaysOn />,
  <ReferenceInput source="ticket_priority" reference="priority" alwaysOn />,
];

export const TicketList = () => {
  return (
    <List
      sort={{ field: "created_at", order: "DESC" }}
      perPage={25}
      filters={filters}
    >
      <Datagrid
        rowClick="show"
        sx={{
          "& .column-lock": {
            padding: "6px 0",
            "& svg": { verticalAlign: "middle" },
          },
        }}
        bulkActionButtons={false}
      >
        <TextField source="title" label="Название" />
        <ReferenceField source="petrol_station_id" reference="petrol-station" label="АЗС" />
        <ReferenceField source="status_id" reference="status" label="Статуc">
          <ChipField source="description" />
        </ReferenceField>
        <ReferenceField source="ticket_category" reference="category" label="Категория">
          <ChipField source="description" />
        </ReferenceField>
        <ReferenceField source="ticket_priority" reference="priority" label="Приоритет" >
          <ChipField source="description" />
        </ReferenceField>
        <ReferenceManyCount label="Вложений" target="ticket_id" reference="attachment" />
        <ReferenceManyCount label="Комментариев" target="ticket_id" reference="comment" />
        <DateField source="created_at" label="Создан" />
      </Datagrid>
    </List>
  );
};
