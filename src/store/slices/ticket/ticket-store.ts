import { create } from 'zustand';
import createAPI from '../../../services/api/api';
import { AttachmentType, CommentType, TicketType, StatusType } from '../../../types';
import { Status } from '../../../const';
import { APIRoute } from '../../../const';
import { createSelectors } from '../../create-selectors';

const api = createAPI();

interface State {
  tickets: {
    entities: Record<string, TicketType>;
    ids: string[];
    status: StatusType;
  };
  attachments: {
    entities: Record<string, AttachmentType>;
    ids: string[];
    status: StatusType;
  };
  comments: {
    entities: Record<string, CommentType>;
    ids: string[];
    status: StatusType;
  };
  uniqTicket: {
    data: TicketType | null;
    status: StatusType;
  };
}

interface Actions {
  setTickets: (data: TicketType[]) => void;
  setTicketsStatus: (status: StatusType) => void;
  setAttachments: (data: AttachmentType[]) => void;
  setAttachmentsStatus: (status: StatusType) => void;
  setComments: (data: CommentType[]) => void;
  setCommentsStatus: (status: StatusType) => void;
  setUniqTicket: (data: TicketType | null) => void;
  setUniqTicketStatus: (status: StatusType) => void;
  fetchTicketsData: () => Promise<void>;
  fetchUniqTicketData: (ticketId: string) => Promise<void>;
  fetchTicketAttachmentData: (attachmentsId: string[]) => Promise<void>;
  fetchTicketCommentsData: (commentsId: string[]) => Promise<void>;
}

const ticketStore = create<State & Actions>((set, get) => ({
  tickets: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  attachments: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  comments: {
    entities: {},
    ids: [],
    status: Status.Idle,
  },
  uniqTicket: {
    data: null,
    status: Status.Idle,
  },
  setTickets: (data) =>
    set((state) => {
      if (!Array.isArray(data)) {
        return state;
      }
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, TicketType>);
      const ids = data.map((item) => item.id).sort((a, b) => new Date(entities[b].created_at).getTime() - new Date(entities[a].created_at).getTime());
      return {
        tickets: {
          ...state.tickets,
          entities,
          ids,
        },
      };
    }),
  setTicketsStatus: (status) =>
    set((state) => ({
      tickets: {
        ...state.tickets,
        status,
      },
    })),
  setAttachments: (data) =>
    set((state) => {
      if (!Array.isArray(data)) {
        return state;
      }
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, AttachmentType>);
      const ids = data.map((item) => item.id);
      return {
        attachments: {
          ...state.attachments,
          entities,
          ids,
        },
      };
    }),
  setAttachmentsStatus: (status) =>
    set((state) => ({
      attachments: {
        ...state.attachments,
        status,
      },
    })),
  setComments: (data) =>
    set((state) => {
      if (!Array.isArray(data)) {
        return state;
      }
      const entities = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {} as Record<string, CommentType>);
      const ids = data.map((item) => item.id);
      return {
        comments: {
          ...state.comments,
          entities,
          ids,
        },
      };
    }),
  setCommentsStatus: (status) =>
    set((state) => ({
      comments: {
        ...state.comments,
        status,
      },
    })),
  setUniqTicket: (data) =>
    set((state) => ({
      uniqTicket: {
        ...state.uniqTicket,
        data,
      },
    })),
  setUniqTicketStatus: (status) =>
    set((state) => ({
      uniqTicket: {
        ...state.uniqTicket,
        status,
      },
    })),
  fetchTicketsData: async () => {
    const { setTicketsStatus, setTickets } = get();
    setTicketsStatus(Status.Loading);
    try {
      const { data } = await api.get<TicketType[]>(APIRoute.TICKETS);
      setTickets(data);
      setTicketsStatus(Status.Success);
    } catch (error) {
      setTicketsStatus(Status.Error);
      throw error;
    }
  },
  fetchUniqTicketData: async (ticketId) => {
    const { setUniqTicketStatus, setUniqTicket } = get();
    setUniqTicketStatus(Status.Loading);
    setUniqTicket(null);
    try {
      const { data } = await api.get<TicketType>(APIRoute.TICKET(ticketId));
      setUniqTicket(data);
      setUniqTicketStatus(Status.Success);
    } catch (error) {
      setUniqTicketStatus(Status.Error);
      setUniqTicket(null);
      throw error;
    }
  },
  fetchTicketAttachmentData: async (attachmentsId) => {
    if (attachmentsId.length === 0) {
      return;
    }
    const { setAttachmentsStatus, setAttachments } = get();
    setAttachmentsStatus(Status.Loading);
    const searchParameters = attachmentsId.map((id) => ["id", id]);
    const parameters = new URLSearchParams(searchParameters);
    try {
      const { data } = await api.get<AttachmentType[]>(APIRoute.ATTACHMENT, { params: parameters });
      setAttachments(data);
      setAttachmentsStatus(Status.Success);
    } catch (error) {
      setAttachmentsStatus(Status.Error);
      throw error;
    }
  },
  fetchTicketCommentsData: async (commentsId) => {
    if (commentsId.length === 0) {
      return;
    }
    const { setCommentsStatus, setComments } = get();
    setCommentsStatus(Status.Loading);
    const searchParameters = commentsId.map((id) => ["id", id]);
    const parameters = new URLSearchParams(searchParameters);
    try {
      const { data } = await api.get<CommentType[]>(APIRoute.COMMENT, { params: parameters.toString() });
      setComments(data);
      setCommentsStatus(Status.Success);
    } catch (error) {
      setCommentsStatus(Status.Error);
      throw error;
    }
  },
}));

export const useTicketStore = createSelectors(ticketStore);