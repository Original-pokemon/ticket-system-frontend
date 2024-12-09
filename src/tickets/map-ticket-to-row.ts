import { TicketType } from '../types';

const mapTicketsToRows = (tickets: TicketType[]) => {
  return tickets.map((ticket) => {
    const { id, title, petrol_station_id, ticket_category, created_at, deadline, description } = ticket
    return {
      id,
      title,
      description,
      petrolStationId: petrol_station_id,
      ticketCategoryId: ticket_category,
      created: created_at,
      deadline,
    };
  });
};

export default mapTicketsToRows;
