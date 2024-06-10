import { Loading, NumberField, useGetOne, useRecordContext, } from "react-admin";
import { ManagerType } from "../types";


export const TicketCountField = () => {
  const record = useRecordContext();
  const { data: manager, isLoading, refetch, error } = useGetOne<ManagerType>(
    'manager',
    { id: record.id.toString() }
  );

  if (isLoading) return <Loading />
  if (error || !manager) return null
  if (!manager?.tickets) {
    refetch()
    return null
  }

    const tickets = manager.tickets.map(ticket => ticket.tickets).flat()

    return (
      <NumberField source="count" record={{
        count: tickets.length
      }} />
    )

}
