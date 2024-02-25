import { fetchUtils, withLifecycleCallbacks } from "react-admin";
import jsonServerProvider from 'ra-data-json-server';
import { config } from "../config";

const baseDataProvider = jsonServerProvider(config.VITE_BACKEND_URL);


export const dataProvider = withLifecycleCallbacks(baseDataProvider, [
  {
    resource: "ticket",
    afterSave: async (ticket, dataProvider) => {
      // update the related customer
      await dataProvider.update("customers", {
        id: ticket.customer_id,
        data: { updated_at: ticket.updated_at },
        previousData: {},
      });
      return ticket;
    },
    beforeDelete: async (params, dataProvider) => {
      // delete the related messages
      const messages = await dataProvider.getList("messages", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: { ticket_id: params.id },
      });
      await dataProvider.deleteMany("messages", {
        ids: messages.data.map((m) => m.id),
      });

      return params;
    },
    beforeDeleteMany: async (params, dataProvider) => {
      // delete the related messages
      const messages = await dataProvider.getList("messages", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
        filter: { ticket_id: params.ids },
      });
      await dataProvider.deleteMany("messages", {
        ids: messages.data.map((m) => m.id),
      });

      return params;
    },
  },
]);

