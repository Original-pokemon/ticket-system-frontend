import Person2Icon from "@mui/icons-material/Person2";
import ManagersList from "../../pages/ManagersList/ManagersList";
import Manager from "../../pages/Manager/Manager";

export default {
  list: ManagersList,
  show: Manager,
  icon: Person2Icon,
  options: { label: "Менеджеры" },
  label: {
    main: 'Управляющие',
    user: 'Менеджеры',
    ticket: 'Задачи',
  },
  recordRepresentation: 'user.user_name'

};
