import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig, AttachmentType, CommentType, TicketType } from '../../../types';
import { NameSpace } from '../../const';
import { APIRoute } from '../../../const';

export const fetchTicketsData = createAsyncThunk<
  TicketType[],
  undefined,
  AsyncThunkConfig
>(`${NameSpace.Ticket}/fetchTicketsData`, async (_args, { extra: api }) => {
  try {
    const { data } = await api.get<TicketType[]>(APIRoute.TICKETS);

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchUniqTicketData = createAsyncThunk<
  TicketType,
  string,
  AsyncThunkConfig
>(`${NameSpace.Ticket}/fetchUniqTicketData`, async (ticketId, { extra: api }) => {
  try {
    const { data } = await api.get<TicketType>(APIRoute.TICKET(ticketId));

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchTicketAttachmentData = createAsyncThunk<
  AttachmentType[],
  string[],
  AsyncThunkConfig
>(`${NameSpace.Ticket}/fetchTicketAttachmentData`, async (attachmentsId, { extra: api }) => {
  if (attachmentsId.length === 0) {
    return [];
  }

  const searchParameters = attachmentsId.map((id) => ["id", id]);
  const parameters = new URLSearchParams(searchParameters);

  try {
    const { data } = await api.get<AttachmentType[]>(APIRoute.ATTACHMENT, { params: parameters });

    return data;
  } catch (error) {
    throw error;
  }
});

export const fetchTicketCommentsData = createAsyncThunk<
  CommentType[],
  string[],
  AsyncThunkConfig
>(`${NameSpace.Ticket}/fetchTicketCommentsData`, async (commentsId, { extra: api }) => {
  if (commentsId.length === 0) {
    return [];
  }
  const searchParameters = commentsId.map((id) => ["id", id]);
  const parameters = new URLSearchParams(searchParameters);

  try {
    const { data } = await api.get<CommentType[]>(APIRoute.COMMENT, { params: parameters.toString() });

    return data;
  } catch (error) {
    throw error;
  }
});

