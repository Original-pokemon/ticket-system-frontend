export type CommentType = {
  id: string;
  ticket_id: string;
  user_id: string;
  text: string;
  created_at?: Date;
  attachments: string[];
};