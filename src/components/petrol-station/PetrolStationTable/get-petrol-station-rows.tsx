import { BushType, ManagerType, PetrolStationType, UserType } from "../../../types";
import { PetrolStationRow } from './get-petrol-station-columns';

type GetPetrolStationsRowsProps = {
  petrolStations: PetrolStationType[];
  managers: Record<string, ManagerType>,
  bushes: Record<string, BushType>,
};

export function getPetrolStationsRows({ petrolStations, managers, bushes }: GetPetrolStationsRowsProps): PetrolStationRow[] {
  return petrolStations.map(({ id, user, bush_id, managers: petrolStationManagers, tickets }) => {
    const petrolStationName = user?.user_name || "Не указано";
    const bushName = bushes[bush_id]?.description || "Не указано";

    const managersNameList = (petrolStationManagers || []).map(({ id }) => {
      return managers[id]?.user?.user_name || "Не указано"
    })

    const totalTasks = tickets ? tickets.length : 0;

    return {
      id,
      petrolStationName,
      bushName,
      managers: managersNameList,
      totalTasks,
    };
  });
}
