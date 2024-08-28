import {
  Show,
  TextField,
  ReferenceManyField,
  DateField,
  ReferenceField,
  SimpleShowLayout,
  useRecordContext,
  ReferenceArrayField,
  Datagrid,
  SingleFieldList,
  ArrayField,
  ChipField,
} from "react-admin";
import { Box } from "@mui/material";
import { CommentList } from "./CommentList";
import AttachmentImageField from "./AttachmentImageField";

export const TicketShow = () => {
  return (
    <Show aside={<ShowAside />} queryOptions={{ refetchOnMount: "always" }}>
      <SimpleShowLayout spacing={2} >
        <TextField source="title" label={false} variant="h5" />
        <TextField source="description" label="Описание" variant="body1" />
        <ReferenceField source="petrol_station_id" reference="petrol-station" label="АЗС" >
          <ChipField source="user.user_name" />
        </ReferenceField>
        <ReferenceField source="ticket_category" reference="category" label="Категория">
          <ChipField source="description" />
        </ReferenceField>

        <DateField source="deadline" label="Заявленная дата исполнения" />

        <ReferenceArrayField source='attachments' reference="attachment" sort={{ field: "created_at", order: "ASC" }} label="Вложения">
          <SingleFieldList linkType={false}>
            <AttachmentImageField imagSize={{ width: 200, height: 200 }} />
          </SingleFieldList>
        </ReferenceArrayField>

        <ReferenceManyField
          label="Комментарии"
          reference="comment"
          target="ticket_id"
          sort={{ field: "created_at", order: "ASC" }}
        >
          <CommentList />
        </ReferenceManyField>
      </SimpleShowLayout>

    </Show>
  );
};

const ShowAside = () => {
  const record = useRecordContext();
  if (!record) return <Box minWidth={200} flexShrink={0} />;
  return (
    <SimpleShowLayout sx={{ minWidth: 200, flexShrink: 0 }}>
      <ArrayField label="История изменений" source="status_history" sortBy="created_at">
        <Datagrid bulkActionButtons={false}>
          <ReferenceField reference="status" source="ticket_status" label="Статус" >
            <ChipField source="description" />
          </ReferenceField>
          <DateField source="created_at" label="Дата" showTime locales={"ru"} />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  );
};
