import { useEffect } from "react";
import { fetchTicketAttachmentData, getAttachmentsStatus, selectAllAttachments } from "../../../store";
import { useAppDispatch, useAppSelector } from "../../../hooks/state";
import { Stack, Typography } from "@mui/material";
import AttachmentImageField from "../Attachment/AttachmentImageField";
import Spinner from "../../Spinner/Spinner";

type AttachmentsProps = {
  attachmentsId: string[];
}

function Attachments({ attachmentsId }: AttachmentsProps) {
  const dispatch = useAppDispatch();
  const ticketAttachments = useAppSelector(selectAllAttachments);
  const attachmentsStatus = useAppSelector(getAttachmentsStatus);

  useEffect(() => {
    if (attachmentsId.length) {
      dispatch(fetchTicketAttachmentData(attachmentsId));
    }
  }, [dispatch, attachmentsId]);

  if (!attachmentsId.length) return <Typography variant="body2">Вложения отсутствуют</Typography>

  if (attachmentsStatus.isLoading) return <Spinner fullscreen={false} />

  return (
    <Stack direction="row" spacing={2}>
      {ticketAttachments.map(({ id, path }) => (
        <AttachmentImageField key={id} id={id} path={path} imagSize={{ width: 200, height: 200 }} />
      ))}
    </Stack>
  )

}

export default Attachments