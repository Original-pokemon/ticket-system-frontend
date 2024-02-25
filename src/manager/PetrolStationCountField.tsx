import { ArrayField, ChipField, Count, Labeled, Link, Loading, ReferenceArrayField, ReferenceManyCount, SingleFieldList, TextField, useGetOne, useRecordContext, useReference, useReferenceOneFieldController } from "react-admin";
import { dataProvider } from "../dataProvider";
import tickets from "../tickets";
import { useEffect } from "react";
import { ManagerType } from "../types";

export const PetrolStationCountField = () => {
  const record = useRecordContext();
  const { data: manager, error, refetch } = useGetOne<ManagerType>(
    'manager',
    { id: record.id.toString() }
  );

  if (!manager?.petrol_stations) {
    return <Loading />
  } else {

    return (<ReferenceManyCount record={manager} source='petrol_stations' target='id' reference="petrol-station" link />)
  }


}
