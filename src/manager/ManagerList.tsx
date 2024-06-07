import {
  ArrayField,
  Count,
  Datagrid,
  Error,
  List,
  Loading,
  ReferenceArrayField,
  ReferenceField,
  ReferenceInput,
  ReferenceManyCount,
  ReferenceManyField,
  ReferenceOneField,
  TextField,
  WithListContext,
  WrapperField,
  useGetOne,
} from "react-admin";
import { TicketCountField } from "./TicketCountField";
import { PetrolStationCountField } from "./PetrolStationCountField";
import { Chip, Stack } from '@mui/material';
import { ManagerType } from "../types";

export const ManagerList = () => (
  <List
    title="Менеджеры"
    filters={[
      <ReferenceInput source="bush_id" label="Куст" reference='bush' alwaysOn />
    ]}
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
