/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { EntityState } from '@reduxjs/toolkit';
import {
  fetchTicketsData,
  fetchUniqTicketData,
  fetchTicketAttachmentData,
  fetchTicketCommentsData,
} from './thunk';
import type { AttachmentType, CommentType, StatusType, TicketType } from '../../../types';
import { Status } from '../../../const';
import { NameSpace } from '../..';

export const ticketsAdapter = createEntityAdapter<TicketType, string>({
  selectId: (ticket) => ticket.id,
});

export const attachmentsAdapter = createEntityAdapter<AttachmentType, string>({
  selectId: (attachment) => attachment.id,
});

export const commentsAdapter = createEntityAdapter<CommentType, string>({
  selectId: (comment) => comment.id,
});

type TicketsState = EntityState<TicketType, string> & { status: StatusType };
type AttachmentsState = EntityState<AttachmentType, string> & { status: StatusType };
type CommentsState = EntityState<CommentType, string> & { status: StatusType };

type InitialStateType = {
  tickets: TicketsState;
  attachments: AttachmentsState;
  comments: CommentsState;
};

const initialState: InitialStateType = {
  tickets: ticketsAdapter.getInitialState({ status: Status.Idle }),
  attachments: attachmentsAdapter.getInitialState({ status: Status.Idle }),
  comments: commentsAdapter.getInitialState({ status: Status.Idle }),
};

const ticketSlice = createSlice({
  name: NameSpace.Ticket,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Обработка fetchTicketsData
    builder
      .addCase(fetchTicketsData.pending, (state) => {
        state.tickets.status = Status.Loading;
      })
      .addCase(fetchTicketsData.fulfilled, (state, action) => {
        state.tickets.status = Status.Success;
        ticketsAdapter.setAll(state.tickets, action.payload);
      })
      .addCase(fetchTicketsData.rejected, (state) => {
        state.tickets.status = Status.Error;
      });

    // Обработка fetchUniqTicketData
    builder
      .addCase(fetchUniqTicketData.pending, (state) => {
        state.tickets.status = Status.Loading;
      })
      .addCase(fetchUniqTicketData.fulfilled, (state, action) => {
        state.tickets.status = Status.Success;
        ticketsAdapter.upsertOne(state.tickets, action.payload);
      })
      .addCase(fetchUniqTicketData.rejected, (state) => {
        state.tickets.status = Status.Error;
      });

    // Обработка fetchTicketAttachmentData
    builder
      .addCase(fetchTicketAttachmentData.pending, (state) => {
        state.attachments.status = Status.Loading;
      })
      .addCase(fetchTicketAttachmentData.fulfilled, (state, action) => {
        state.attachments.status = Status.Success;
        attachmentsAdapter.upsertMany(state.attachments, action.payload);
      })
      .addCase(fetchTicketAttachmentData.rejected, (state) => {
        state.attachments.status = Status.Error;
      });

    // Обработка fetchTicketCommentsData
    builder
      .addCase(fetchTicketCommentsData.pending, (state) => {
        state.comments.status = Status.Loading;
      })
      .addCase(fetchTicketCommentsData.fulfilled, (state, action) => {
        state.comments.status = Status.Success;
        commentsAdapter.upsertMany(state.comments, action.payload);
      })
      .addCase(fetchTicketCommentsData.rejected, (state) => {
        state.comments.status = Status.Error;
      });
  },
});

export default ticketSlice.reducer;