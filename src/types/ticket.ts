export type TicketType = {
  id: string;
  title: string;
  description: string;
  user_id?: string;
  attachments: string[];
  petrol_station_id: string;
  ticket_category?: string;
  ticket_priority?: string;
  status_id: string;
  created_at: string;
  deadline?: Date;
  status_history?: string[];
  comments: string[];
};
