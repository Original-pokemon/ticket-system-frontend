import { Ticket } from "../../pages/Ticket/Ticket";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TicketsList from "../../pages/TicketsList/TicketsList";

export default {
  list: TicketsList,
  options: { label: 'Задачи' },
  show: Ticket,
  icon: ConfirmationNumberIcon,
};
