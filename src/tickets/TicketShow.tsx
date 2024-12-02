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
  useStore,
  FunctionField,
} from "react-admin";
import { Chip } from "@mui/material";
import { CommentList } from "./CommentList";
import AttachmentImageField from "./fields/AttachmentImageField";
import { StoreKey } from "../preload-data/preload-data";
import getDescription from "../utils/get-desctiption";
import type { CategoryType, PetrolStationType, TicketType } from "../types";

export const TicketShow = () => {
  const [categoriesData] = useStore<CategoryType[]>(StoreKey.CATEGORY_DATA, []);
  const [petrolStationsData] = useStore<PetrolStationType[]>(StoreKey.PETROL_STATION_DATA, []);

  return (
    <Show aside={<ShowAside />} queryOptions={{ refetchOnMount: "always" }}>
      <SimpleShowLayout spacing={2} >
        <TextField source="title" label={false} variant="h5" />
        <TextField source="description" label="Описание" variant="body1" />

        <FunctionField
          label="АЗС"
          render={(record: TicketType) => (
            <Chip label={petrolStationsData.find((entry) => entry.id === record.petrol_station_id)?.user?.user_name} />
          )}
        />

        <FunctionField
          label="Категория"
          render={(record: TicketType) => (
            <Chip label={getDescription(record.ticket_category, categoriesData)} />
          )}
        />
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
  const ticketRecord = useRecordContext<TicketType>();
  const [statusesData] = useStore<CategoryType[]>(StoreKey.STATUS_DATA, []);
  if (!ticketRecord || !statusesData.length) return null;

  return (
    <SimpleShowLayout sx={{ minWidth: 200, flexShrink: 0 }}>
      <ArrayField label="История изменений" source="status_history" sortBy="created_at">
        <Datagrid bulkActionButtons={false}>

          <FunctionField
            label="Статуc"
            render={(record: { ticket_status: string }) => {
              return (
                <Chip label={getDescription(record.ticket_status, statusesData)} />
              )
            }}
          />

          <ReferenceField label="Пользователь" reference="user" source="user_id" />

          <DateField source="created_at" label="Дата" showTime locales={"ru"} />
        </Datagrid>
      </ArrayField>
    </SimpleShowLayout>
  );
};
