import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PetrolStation from '../../pages/PetrolStation/PetrolStation';
import { PetrolStationList } from '../../pages/PetrolStationList/PetrolStationList';

export default {
  list: PetrolStationList,
  show: PetrolStation,
  options: { label: 'Станции АЗС ' },
  icon: LocalGasStationIcon,
  recordRepresentation: "user.user_name"
}