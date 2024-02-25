import { ArrayField, ChipField, Count, Labeled, Link, Loading, ReferenceArrayField, ReferenceManyCount, SingleFieldList, TextField, useGetOne, useRecordContext, useReference, useReferenceOneFieldController } from "react-admin";
import { dataProvider } from "../dataProvider";
import tickets from "../tickets";
import { useEffect } from "react";
import { ManagerType } from "../types";


export const TicketCountField = () => {
  const record = useRecordContext();
  const { data: manager, error, refetch } = useGetOne<ManagerType>(
    'manager',
    { id: record.id.toString() }
  );

  if (!manager?.tickets) {
    return <Loading />
  } else {

    return (
      <ReferenceManyCount record={manager} source='petrol_stations' target='petrol_station_id' reference="ticket" link />
    )

  }


}
