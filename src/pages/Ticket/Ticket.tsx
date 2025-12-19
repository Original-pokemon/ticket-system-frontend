import { useEffect, useLayoutEffect } from 'react';
import { Typography, Chip, Stack, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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
  const ticketCategory = ticket?.ticket_category ? useCategoryById(ticket?.ticket_category) : null
  const allComments = useComments();
  const comments = allComments.filter(comment => comment.ticket_id === id);
  const usersEntities = useUsersEntities()
  const petrolStation = ticket?.petrol_station_id ? usePetrolStationById(ticket?.petrol_station_id) : null
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
      {
        uniqTicketStatus.isError ?
          <Typography variant="h6" color="error">
            Произошла ошибка при загрузке данных тикета.
          </Typography> : (
            <Single>
              <Single.MainContent>
                <Single.Title>{ticket?.title}</Single.Title>
                <Single.Section>
                  <Single.Item label="Описание">
                    <Typography>{ticket?.description}</Typography>
                  </Single.Item>
                  <Single.Item label="АЗС">
                    {petrolStationsStatus.isLoading ? <Spinner fullscreen={false} /> : (
                    <Chip label={petrolStation?.user?.user_name || 'Не указано'} />
                    )}
                  </Single.Item>
                  <Single.Item label="Статус">
                    {referenceDataStatus.isSuccess ? (
                      <Chip label={statusesEntities[ticket?.status_id || '']?.description || 'Не указано'} />
                    ) : (
                      <Spinner fullscreen={false} />
                    )}
                  </Single.Item>
                  <Single.Item label="Категория">
                    {referenceDataStatus.isSuccess ? (
                    <Chip label={ticketCategory?.description || 'Не указано'} />
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
                    <Typography variant="body2">No results found</Typography>
                  ) : (
                    <Stack spacing={1}>
                      {comments.map((comment) => (
                        <Paper key={comment.id} sx={{ p: 1 }}>
                          <Typography variant="body2">{comment.text}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {dayjs(comment.created_at).format('HH:mm DD.MM.YYYY')}
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  )}
                </Single.Comments>
              </Single.MainContent>

              <Single.SidePanel title="История изменений">
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Статус</TableCell>
                        <TableCell>Пользователь</TableCell>
                        <TableCell>Дата</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(uniqTicketStatus.isSuccess && ticket?.status_history) && (ticket?.status_history).map(({ id: historyId, ticket_status, created_at, user_id }) => (
                        <TableRow key={historyId}>
                          <TableCell>
                            {referenceDataStatus.isSuccess ? (
                              <Chip label={statusesEntities[ticket_status].description || 'Не указано'} />
                            ) : (
                              <Spinner fullscreen={false} />
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">

                              {userStatus.isSuccess ? usersEntities[user_id]?.user_name : <Spinner fullscreen={false} />}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {dayjs(created_at).format('HH:mm DD.MM.YYYY')}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Single.SidePanel>
            </Single>
          )
      }

    </PageLayout>
  );
};

