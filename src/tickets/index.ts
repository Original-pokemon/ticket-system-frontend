import { TicketShow } from "./TicketShow";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Tickets from "../pages/Tickets/Tickets";

export default {
  list: Tickets,
  options: { label: 'Задачи' },
  show: TicketShow,
  icon: ConfirmationNumberIcon,
};
