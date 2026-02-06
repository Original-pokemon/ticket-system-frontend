import { useEffect, useLayoutEffect } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import dayjs from 'dayjs';
import {
  useUserManagementActions,
  useUsersEntities,
  useUsersStatus,
  usePetrolStationsStatus,
  useLocationDataActions,
  useReferenceDataStatus,
  useReferenceDataActions,
  useCategoryById,
  usePetrolStationById,
  useStatusesEntities,
  useUniqTicket,
  useUniqTicketStatus,
  useComments,
  useCommentsStatus,
  useTicketActions
} from '../../store';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Single from '../../components/Single/Single';
import PageLayout from '../../components/layouts/PageLayout/PageLayout';
import Attachments from '../../components/tickets/Attachments/Attachments';

export const Ticket = () => {
  const { fetchCategoriesData, fetchStatusesData } = useReferenceDataActions()
  const { fetchPetrolStations } = useLocationDataActions()
  const { fetchUniqTicketData, fetchTicketCommentsData } = useTicketActions()
  const { fetchUsersData } = useUserManagementActions()
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const ticket = useUniqTicket();
  const ticketCategory = useCategoryById(ticket?.ticket_category || '')
  const allComments = useComments();
  const comments = allComments.filter(comment => comment.ticket_id === id);
  const usersEntities = useUsersEntities()
  const petrolStation = usePetrolStationById(ticket?.petrol_station_id || '')
  const statusesEntities = useStatusesEntities()

  const uniqTicketStatus = useUniqTicketStatus();
  const commentsStatus = useCommentsStatus();
  const referenceDataStatus = useReferenceDataStatus();
  const petrolStationsStatus = usePetrolStationsStatus();
  const userStatus = useUsersStatus();

  useLayoutEffect(() => {
    fetchUniqTicketData(id);
    fetchUsersData();
  }, [fetchUniqTicketData, fetchUsersData, id]);

  useEffect(() => {
    if (uniqTicketStatus.isSuccess && ticket) {
      if (petrolStationsStatus.isIdle) {
        fetchPetrolStations()
      }

      if (commentsStatus.isIdle) {
        fetchTicketCommentsData(ticket.comments);
      }
    }
  }, [uniqTicketStatus.isSuccess, fetchPetrolStations, fetchTicketCommentsData, referenceDataStatus.isIdle, petrolStationsStatus.isIdle, commentsStatus.isIdle, id, ticket]);

  useEffect(() => {
    if (uniqTicketStatus.isSuccess && ticket) {
      if (referenceDataStatus.isIdle) {
        fetchStatusesData();
        fetchCategoriesData();
      }
    }
  }, [uniqTicketStatus.isSuccess, ticket, ticket?.attachments.length, referenceDataStatus.isIdle, petrolStationsStatus.isIdle, commentsStatus.isIdle, id, fetchCategoriesData, fetchStatusesData, fetchPetrolStations, fetchTicketCommentsData]);

  if (uniqTicketStatus.isLoading || uniqTicketStatus.isIdle) {
    return <Spinner fullscreen />;
  }

  return (
    <PageLayout>
      <PageLayout.BackButton />
      {
        uniqTicketStatus.isError ?
          <h6 className="text-lg text-red-500">
            Произошла ошибка при загрузке данных тикета.
          </h6> : (
            <Single>
              <Single.MainContent>
                <Single.Title>{ticket?.title}</Single.Title>
                <Single.Section>
                  <Single.Item label="Описание">
                    <p>{ticket?.description}</p>
                  </Single.Item>
                  <Single.Item label="АЗС">
                    {petrolStationsStatus.isLoading ? <Spinner fullscreen={false} /> : (
                      <Badge>{petrolStation?.user?.user_name || 'Не указано'}</Badge>
                    )}
                  </Single.Item>
                  <Single.Item label="Статус">
                    {referenceDataStatus.isSuccess ? (
                      <Badge>{statusesEntities[ticket?.status_id || '']?.description || 'Не указано'}</Badge>
                    ) : (
                      <Spinner fullscreen={false} />
                    )}
                  </Single.Item>
                  <Single.Item label="Категория">
                    {referenceDataStatus.isSuccess ? (
                      <Badge>{ticketCategory?.description || 'Не указано'}</Badge>
                    ) : (
                      <Spinner fullscreen={false} />
                    )}
                  </Single.Item>
                  <Single.Item label="Заявленная дата исполнения">
                    {ticket?.deadline ? dayjs(ticket.deadline).format('DD.MM.YYYY') : 'Не указана'}
                  </Single.Item>
                </Single.Section>

                <Single.Attachments title="Вложения">
                  <Attachments attachmentsId={ticket?.attachments || []} />
                </Single.Attachments>

                <Single.Comments title="Комментарии">
                  {comments.length === 0 ? (
                    <span className="text-sm">No results found</span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {comments.map((comment) => (
                        <div key={comment.id} className="p-1 bg-white shadow">
                          <p className="text-sm">{comment.text}</p>
                          <span className="text-xs text-gray-500">
                            {dayjs(comment.created_at).format('HH:mm DD.MM.YYYY')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Single.Comments>
              </Single.MainContent>

              <Single.SidePanel title="История изменений">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell>Статус</TableCell>
                      <TableCell>Пользователь</TableCell>
                      <TableCell>Дата</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(uniqTicketStatus.isSuccess && ticket?.status_history) && (ticket?.status_history).map(({ id: historyId, ticket_status, created_at, user_id }) => (
                      <TableRow key={historyId}>
                        <TableCell>
                          {referenceDataStatus.isSuccess ? (
                            <Badge>{statusesEntities[ticket_status].description || 'Не указано'}</Badge>
                          ) : (
                            <Spinner fullscreen={false} />
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {userStatus.isSuccess ? usersEntities[user_id]?.user_name : <Spinner fullscreen={false} />}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {dayjs(created_at).format('HH:mm DD.MM.YYYY')}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Single.SidePanel>
            </Single>
          )
      }
    </PageLayout>
  );
};

