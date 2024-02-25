import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { PetrolStationList } from "./PetrolStationList";
import { PetrolStationShow } from './PetrolStationShow';

export default {
  list: PetrolStationList,
  show: PetrolStationShow,
  options: { label: 'Станции АЗС ' },
  icon: LocalGasStationIcon,
  recordRepresentation: "user.user_name"
}