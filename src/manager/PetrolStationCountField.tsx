import { Loading, ReferenceManyCount, useGetOne, useRecordContext, } from "react-admin";
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

    return (<ReferenceManyCount record={manager} source='petrol_stations' target='id' reference="petrol-station" link />)
  }


}
