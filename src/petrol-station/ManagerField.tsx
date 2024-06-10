import { Loading, ReferenceArrayField, useGetOne, useRecordContext } from "react-admin";
import { PetrolStationType } from "../types";

export const ManagerField = () => {
  const record = useRecordContext();
  const { data: petrolStation, isLoading, refetch, error } = useGetOne<PetrolStationType>(
    'petrol-station',
    { id: record.id.toString() },
  );

  if (isLoading) return <Loading />
  if (error || !petrolStation) return null
  if (!petrolStation?.managers) {
    refetch()
    return null
  }
  return <ReferenceArrayField record={petrolStation} source='managers' reference="manager" />


}
