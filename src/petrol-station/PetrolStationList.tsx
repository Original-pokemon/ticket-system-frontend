import {
  Datagrid,
  List,
  ReferenceField,
  ReferenceInput,
  ReferenceManyCount,
  TextField,
  WrapperField,
} from "react-admin";
import { ManagerField } from "./ManagerField";

const filters = [
  <ReferenceInput source="bush_id" label="Куст" reference="bush" alwaysOn />,
]

export const PetrolStationList = () => (
  <List
    title={"АЗС"}
    filters={filters}
    perPage={25}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="user.user_name" label="АЗС">
      </TextField>
      <ReferenceField resource="description" source="bush_id" reference="bush" label="Куст" />
      <WrapperField label='Менеджер'>
        <ManagerField />
      </WrapperField>
      <ReferenceManyCount reference="ticket" target="petrol_station_id" label="Задачи" />
    </Datagrid>
  </List >
);
