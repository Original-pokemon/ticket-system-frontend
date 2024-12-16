import { PetrolStationType, TicketType } from "../types";

type FilterTicketsProps = {
  ticketsData: TicketType[];
  petrolStations: Record<PetrolStationType['id'], PetrolStationType>;
  ticketStatusType: string[];
  bushesType: string[];
  categoriesType: string[];
};

const filterTickets = ({
  ticketsData,
  petrolStations,
  ticketStatusType,
  bushesType,
  categoriesType
}: FilterTicketsProps): TicketType[] => {
  return ticketsData.filter((ticket) => {
    let ticketStatusTypeMatch = true

    if (ticketStatusType.length > 0) {
      ticketStatusTypeMatch = ticketStatusType.includes(String(ticket.status_id));
    }

    let bushTypeMatch = true

    if (bushesType.length > 0) {
      const petrolStation = petrolStations[ticket.petrol_station_id]

      if (petrolStation) {
        bushTypeMatch = bushesType.includes(String(petrolStation.bush_id));
      }
    }

    let categoryTypeMatch = true

    if (categoriesType.length > 0) {
      categoryTypeMatch = categoriesType.includes(String(ticket.ticket_category));
    }

    return categoryTypeMatch && bushTypeMatch && ticketStatusTypeMatch;
  });
};

export default filterTickets