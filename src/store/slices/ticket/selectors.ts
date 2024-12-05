import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "../..";
import { Status } from "../../../const";
import { StatusType } from "../../../types";
import { InitialStateType } from "../../reducer";
import { attachmentsAdapter, commentsAdapter, ticketsAdapter } from "./ticket";

type TicketStateType = Pick<
  InitialStateType,
  typeof NameSpace.Ticket
>;

export const {
  selectAll: selectAllTickets,
  selectById: selectTicketById,
} = ticketsAdapter.getSelectors(
  (state: TicketStateType) => state[NameSpace.Ticket].tickets
);

export const {
  selectAll: selectAllAttachments,
  selectById: selectAttachmentById,
} = attachmentsAdapter.getSelectors(
  (state: TicketStateType) => state[NameSpace.Ticket].attachments
);

export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
} = commentsAdapter.getSelectors(
  (state: TicketStateType) => state[NameSpace.Ticket].comments
);

export const getAttachmentsStatus = createSelector(
  (state: TicketStateType) => state[NameSpace.Ticket].attachments.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);
export const getCommentsStatus = createSelector(
  (state: TicketStateType) => state[NameSpace.Ticket].comments.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);
export const getTicketsStatus = createSelector(
  (state: TicketStateType) => state[NameSpace.Ticket].tickets.status,
  (status) => ({
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  }),
);

export const getTicketStatus = createSelector(
  getAttachmentsStatus,
  getCommentsStatus,
  getTicketsStatus,
  (attachmentsStatus, commentsStatus, ticketsStatus) => {
    const statuses = [attachmentsStatus.status, commentsStatus.status, ticketsStatus.status];

    let status: StatusType = Status.Idle;

    if (statuses.every((status) => status === Status.Success)) {
      status = Status.Success;
    }

    if (statuses.includes(Status.Loading)) {
      status = Status.Loading;
    }

    if (statuses.includes(Status.Error)) {
      status = Status.Error;
    }

    return {
      status,
      isIdle: status === Status.Idle,
      isLoading: status === Status.Loading,
      isError: status === Status.Error,
      isSuccess: status === Status.Success,
    }
  },
);