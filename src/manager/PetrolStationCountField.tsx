import { Loading, NumberField, useGetOne, useRecordContext, } from "react-admin";
import { ManagerType } from "../types";

export const PetrolStationCountField = () => {
  const record = useRecordContext();
  const { data: manager } = useGetOne<ManagerType>(
    'manager',
    { id: record.id.toString() }
  );

  if (!manager?.petrol_stations) {
    return <Loading />
  } else {
    return (
      <NumberField source="count" record={{
        count: manager.petrol_stations.length
      }} />
    )
  }


}
