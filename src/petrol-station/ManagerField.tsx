import { Loading, ReferenceArrayField, useGetOne, useRecordContext } from "react-admin";
import { PetrolStationType } from "../types";

export const ManagerField = () => {
  const record = useRecordContext();
  const { data: petrolStation, error, refetch } = useGetOne<PetrolStationType>(
    'petrol-station',
    { id: record.id.toString() }
  );

  if (!petrolStation?.managers) {
    return <Loading />
  } else {
    return <ReferenceArrayField record={petrolStation} source='managers' reference="manager" />
  }


}
