import {
  Datagrid,
  List,
  ReferenceManyCount,
  ReferenceField,
  SearchInput,
  TextField,
} from "react-admin";

export const BushList = () => (
  <List >
    <Datagrid>
      <TextField source="description" />
      <ReferenceManyCount
        label="Tickets"
        reference="ticket"
        target="ticket_bush"
      />
    </Datagrid>
  </List>
);
