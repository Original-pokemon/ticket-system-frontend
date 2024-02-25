import Person2Icon from "@mui/icons-material/Person2";
import { ManagerList } from "./ManagerList";
import { ManagerShow } from "./ManagerShow";
// import { CustomerShow } from "./CustomerShow";

export default {
  list: ManagerList,
  show: ManagerShow,
  icon: Person2Icon,
  options: { label: "Менеджеры" },
  label: {
    main: 'Управляющие',
    user: 'Менеджеры',
    ticket: 'Задачи',
  },
  recordRepresentation: 'user.user_name'

};
