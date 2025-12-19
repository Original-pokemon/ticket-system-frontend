import { useTicketStore } from './ticket-store';
import { Status } from '../../../const';
import { StatusType } from '../../../types';

export const useTickets = () => {
  const { ids, entities } = useTicketStore.use.tickets();
  return ids.map((id) => entities[id]);
};

export const useTicketsEntities = () => useTicketStore.use.tickets().entities;

export const useTicketById = (id: string) => {
  const entities = useTicketStore.use.tickets().entities;
  return entities[id];
};

export const useAttachments = () => {
  const { ids, entities } = useTicketStore.use.attachments();
  return ids.map((id) => entities[id]);
};

export const useAttachmentsEntities = () => useTicketStore.use.attachments().entities;

export const useAttachmentById = (id: string) => {
  const entities = useTicketStore.use.attachments().entities;
  return entities[id];
};

export const useComments = () => {
  const { ids, entities } = useTicketStore.use.comments();
  return ids.map((id) => entities[id]);
};

export const useCommentsEntities = () => useTicketStore.use.comments().entities;

export const useCommentById = (id: string) => {
  const entities = useTicketStore.use.comments().entities;
  return entities[id];
};

export const useUniqTicket = () => useTicketStore.use.uniqTicket().data;

export const useUniqTicketStatus = () => {
  const status = useTicketStore.use.uniqTicket().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useTicketsStatus = () => {
  const status = useTicketStore.use.tickets().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useAttachmentsStatus = () => {
  const status = useTicketStore.use.attachments().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useCommentsStatus = () => {
  const status = useTicketStore.use.comments().status;
  return {
    status,
    isIdle: status === Status.Idle,
    isLoading: status === Status.Loading,
    isError: status === Status.Error,
    isSuccess: status === Status.Success,
  };
};

export const useTicketStatus = () => {
  const attachmentsStatus = useTicketStore.use.attachments().status;
  const commentsStatus = useTicketStore.use.comments().status;
  const ticketsStatus = useTicketStore.use.tickets().status;
  const statuses = [attachmentsStatus, commentsStatus, ticketsStatus];

  let status: StatusType = Status.Idle;

  if (statuses.every((s) => s === Status.Success)) {
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
  };
};

export const useTicketActions = () => ({
  fetchTicketsData: useTicketStore.use.fetchTicketsData(),
  fetchUniqTicketData: useTicketStore.use.fetchUniqTicketData(),
  fetchTicketAttachmentData: useTicketStore.use.fetchTicketAttachmentData(),
  fetchTicketCommentsData: useTicketStore.use.fetchTicketCommentsData(),
});