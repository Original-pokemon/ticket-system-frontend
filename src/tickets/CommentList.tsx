import { DateField, SingleFieldList, ReferenceManyField, Datagrid, TextField, ArrayField } from "react-admin";
import AttachmentImageField from "./fields/AttachmentImageField";


export const CommentList = () => {
  return (
    <Datagrid sx={{ backgroundColor: "#f5f5f5" }} bulkActionButtons={false}>
      <TextField label='Сообщение' source="text" />
      <ArrayField source="attachments" label="Вложения">
        <SingleFieldList linkType={false}>
          <AttachmentImageField imagSize={{ width: 60, height: 60 }} />
        </SingleFieldList>
      </ArrayField>

      <DateField label='Дата создания' source="created_at" sx={{ ml: 1 }} />
    </Datagrid >
  );
};
