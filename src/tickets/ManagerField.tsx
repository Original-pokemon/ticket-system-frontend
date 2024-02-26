import { ArrayField, ChipField, Count, Labeled, Link, Loading, ReferenceArrayField, ReferenceManyCount, SingleFieldList, TextField, useGetOne, useRecordContext, useReference, useReferenceOneFieldController } from "react-admin";
import { dataProvider } from "../dataProvider";
import tickets from "../tickets";
import { useEffect } from "react";

export type UserType = {
  id: string;
  user_name: string;
  first_name: string;
  last_name?: string;
  user_group: string;
  created_at?: string;
};

export type PetrolStationType = {
  id: string;
  bush_id?: string;
  managers?: string[];
  user?: UserType;
  tickets?: string[];
};

type TicketType = {
  id: string;
  title: string;
  description: string;
  user_id?: string;
  attachments: string[];
  petrol_station_id: string;
  ticket_category?: string;
  ticket_priority?: string;
  status_id: string;
  status_history: StatusHistoryType[];
  comments: string[];
};

type StatusHistoryType = {
  id: string;
  ticket_id: string;
  user_id: string;
  ticket_status: number;
  created_at: Date;
};

export const ManagerField = () => {
  const record = useRecordContext<TicketType>();
  const { data: petrolStation, error, refetch } = useGetOne<PetrolStationType>(
    'petrol-station',
    { id: record.petrol_station_id.toString() }
  );

  if (!petrolStation?.managers) {
    return <Loading />
  } else {
    return (<ReferenceArrayField record={petrolStation} source='managers' reference="manager" resource="user.name" />)
  }


}
