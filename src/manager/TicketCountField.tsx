import { NumberField, useGetOne, useRecordContext, } from "react-admin";
import { ManagerType } from "../types";


export const TicketCountField = () => {
  const record = useRecordContext();
  const { data: manager } = useGetOne<ManagerType>(
    'manager',
    { id: record.id.toString() }
  );

  if (!manager?.tickets) {
    return null
  } else {
    const tickets = manager.tickets.map(ticket => ticket.tickets).flat()
    return (
      <NumberField source="count" record={{
        count: tickets.length
      }} />
    )
  }


}
