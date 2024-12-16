import { Loading, NumberField, useGetOne, useRecordContext, } from "react-admin";
import { ManagerType } from "../types";

export const PetrolStationCountField = () => {
  const record = useRecordContext();
  const { data: manager, isLoading, refetch, error } = useGetOne<ManagerType>(
    'manager',
    { id: record.id.toString() }
  );

  if (isLoading) <Loading />
  if (!manager || error) return null
  if (!manager?.petrol_stations) {
    refetch()
    return null
  }

  return <NumberField source="count" record={{ count: manager.petrol_stations.length }} />

}
