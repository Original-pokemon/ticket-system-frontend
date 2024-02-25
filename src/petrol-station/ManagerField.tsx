import { ArrayField, ChipField, Count, Labeled, Link, Loading, ReferenceArrayField, ReferenceManyCount, SingleFieldList, TextField, useGetOne, useRecordContext, useReference, useReferenceOneFieldController } from "react-admin";
import { dataProvider } from "../dataProvider";
import tickets from "../tickets";
import { useEffect } from "react";
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
    return (<ReferenceArrayField record={petrolStation} source='managers' reference="manager" resource="user.name" />)
  }


}
