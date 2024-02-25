import {
  Datagrid,
  List,
  ReferenceField,
  ReferenceInput,
  TextField,
  WrapperField,
} from "react-admin";
import { TicketCountField } from "./TicketCountField";
import { PetrolStationCountField } from "./PetrolStationCountField";

export const ManagerList = () => (
  <List
    title="Менеджеры"
    filters={[<ReferenceInput source="bush_id" label="Куст" reference='bush' alwaysOn />]}
    perPage={25}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="user.user_name" resource="manager" label="Менеджер" />
      <ReferenceField resource="description" source="bush_id" reference="bush" label="Куст" />
      <WrapperField label="Задачи">
        <TicketCountField />
      </WrapperField>
      <WrapperField label="АЗС">
        <PetrolStationCountField />
      </WrapperField>
    </Datagrid>
  </List >
);
