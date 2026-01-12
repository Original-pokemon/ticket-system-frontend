import { useEffect } from "react";
import { useAttachments, useAttachmentsStatus, useTicketActions } from "../../../store";
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

  if (!attachmentsId.length) return <p>Вложения отсутствуют</p>

  if (attachmentsStatus.isLoading) return <Spinner fullscreen={false} />

  return (
    <div className="flex flex-row gap-2">
      {ticketAttachments.map(({ id, path }) => (
        <AttachmentImageField key={id} id={id} path={path} imagSize={{ width: 200, height: 200 }} />
      ))}
    </div>
  )

}

export default Attachments