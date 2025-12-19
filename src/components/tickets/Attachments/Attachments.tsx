import { useEffect } from "react";
import { useAttachments, useAttachmentsStatus, useTicketActions } from "../../../store";
import { Stack, Typography } from "@mui/material";
import AttachmentImageField from "../Attachment/AttachmentImageField";
import Spinner from "../../Spinner/Spinner";

type AttachmentsProps = {
  attachmentsId: string[];
}

function Attachments({ attachmentsId }: AttachmentsProps) {
  const { fetchTicketAttachmentData } = useTicketActions();
  const ticketAttachments = useAttachments();
  const attachmentsStatus = useAttachmentsStatus();

  useEffect(() => {
    if (attachmentsId.length) {
      fetchTicketAttachmentData(attachmentsId);
    }
  }, [attachmentsId, fetchTicketAttachmentData]);

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