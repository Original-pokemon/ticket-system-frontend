import { useEffect, useLayoutEffect } from 'react';
import { Typography, Chip, Stack, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../hooks/state';
import {
  fetchStatusesData,
  fetchCategoriesData,
  fetchPetrolStationData,
  fetchUniqTicketData,
  fetchTicketAttachmentData,
  fetchTicketCommentsData,
  selectCategoryById,
  selectPetrolStationById,
  selectAllAttachments,
  selectAllComments,
  getUniqTicketStatus,
  getAttachmentsStatus,
  getCommentsStatus,
  getReferenceDataStatus,
  getPetrolStationsStatus,
  getUniqTicket,
  selectStatusesEntities,
  fetchUsersData,
  selectUsersEntities,
  getUsersStatus
} from '../../store';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import Single from '../../components/Single/Single';
import PageLayout from '../../components/layouts/PageLayout/PageLayout';
import AttachmentImageField from '../../components/tickets/Attachment/AttachmentImageField';
import Attachments from '../../components/tickets/Attachments/Attachments';

export const Ticket = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const ticket = useAppSelector(getUniqTicket);
  const ticketCategory = useAppSelector((state) => selectCategoryById(state, ticket?.ticket_category || ''));
  const statusesEntities = useAppSelector(selectStatusesEntities);
  const petrolStation = useAppSelector((state) => selectPetrolStationById(state, ticket?.petrol_station_id || ''));
  const comments = useAppSelector(selectAllComments).filter(comment => comment.ticket_id === id);
  const usersEntities = useAppSelector(selectUsersEntities)

  const uniqTicketStatus = useAppSelector(getUniqTicketStatus);
  const commentsStatus = useAppSelector(getCommentsStatus);
  const referenceDataStatus = useAppSelector(getReferenceDataStatus);
  const petrolStationsStatus = useAppSelector(getPetrolStationsStatus);
  const userStatus = useAppSelector(getUsersStatus);

  useLayoutEffect(() => {
    dispatch(fetchUniqTicketData(id));
    dispatch(fetchUsersData());
  }, [dispatch, id]);

  useEffect(() => {
    if (uniqTicketStatus.isSuccess && ticket) {
      if (referenceDataStatus.isIdle) {
        dispatch(fetchStatusesData());
        dispatch(fetchCategoriesData());
      }

      if (petrolStationsStatus.isIdle) {
        dispatch(fetchPetrolStationData());
      }

      if (commentsStatus.isIdle) {
        dispatch(fetchTicketCommentsData(ticket.comments));
      }
    }
  }, [uniqTicketStatus.isSuccess, dispatch, referenceDataStatus.isIdle, petrolStationsStatus.isIdle, commentsStatus.isIdle, id]);

  useEffect(() => {
    if (uniqTicketStatus.isSuccess && ticket) {
      if (referenceDataStatus.isIdle) {
        dispatch(fetchStatusesData());
        dispatch(fetchCategoriesData());
      }
    }
  }, [uniqTicketStatus.isSuccess, ticket, ticket?.attachments.length, dispatch, referenceDataStatus.isIdle, petrolStationsStatus.isIdle, commentsStatus.isIdle, id]);

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
