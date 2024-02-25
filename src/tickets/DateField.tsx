import {
  DateField,
  DateFieldProps,
  useRecordContext,
  useGetOne,
} from "react-admin";

type TicketType = {
  id: string;
  title: string;
  description: string;
  user_id?: string;
  attachments: string[];
  petrol_station_id: string;
  ticket_category?: string;
  ticket_priority?: string;
  status_id: string;
  status_history: StatusHistoryType[];
  comments: string[];
};

type StatusHistoryType = {
  id: string;
  ticket_id: string;
  user_id: string;
  ticket_status: number;
  created_at: Date;
};

export const CreateDateField = (props: DateFieldProps) => {
  const record = useRecordContext();
  const { data: ticket, error, refetch } = useGetOne<TicketType>(
    'ticket',
    { id: record.id.toString() }
  );

  if (!ticket?.status_history) {
    return null
  }
  if (ticket?.status_history?.length <= 0) {
    return null
  }

  const firstStatus = ticket.status_history.at(-1)

  return (<DateField record={firstStatus} source="created_at" />)
};
