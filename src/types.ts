export type UserType = {
  id: string;
  user_name: string;
  first_name: string;
  last_name?: string;
  user_group: string;
  created_at?: string;
};

type ManagerTicketType = {
  petrol_station: string;
  tickets: string[];
};

export type ManagerType = {
  id: string;
  bush_id?: string;
  tickets: ManagerTicketType[];
  petrol_stations?: string[];
  user?: UserType;
};

export type PetrolStationType = {
  id: string;
  bush_id?: string;
  managers?: string[];
  user?: UserType;
  tickets?: string[];
};

export type CommentType = {
  id: string;
  ticket_id: string;
  user_id: string;
  text: string;
  created_at?: Date;
  attachments: string[];
};

export type AttachmentType = {
  id: string;
  ticket_id?: string;
  comment_id?: string;
  path: string;
};

export type TicketType = {
  id?: string;
  title: string;
  description: string;
  user_id?: string;
  attachments: string[];
  petrol_station_id: string;
  ticket_category?: string;
  ticket_priority?: string;
  status_id: string;
  created_at?: Date;
  status_history?: string[];
  comments: string[];
};
