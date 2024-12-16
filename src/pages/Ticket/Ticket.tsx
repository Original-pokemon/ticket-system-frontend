import { useEffect } from 'react';
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
  selectAllStatuses,
  selectAllComments,
  getUniqTicketStatus,
  getAttachmentsStatus,
  getCommentsStatus,
  getReferenceDataStatus,
  getPetrolStationsStatus,
  getUniqTicket,
  selectStatusesEntities
} from '../../store';
import { useLocation } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import AttachmentImageField from '../../components/tickets/TicketTable/AttachmentImageField';
import Single from '../../components/Single/Single';
import PageLayout from '../../components/layouts/PageLayout/PageLayout';

export const Ticket = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname.split('/');
  const id = path[2];

  const ticket = useAppSelector(getUniqTicket);
  const ticketCategory = useAppSelector((state) => selectCategoryById(state, ticket?.ticket_category || ''));
  const statusesEntities = useAppSelector(selectStatusesEntities);
  const petrolStation = useAppSelector((state) => selectPetrolStationById(state, ticket?.petrol_station_id || ''));
  const ticketAttachments = useAppSelector(selectAllAttachments);
  const comments = useAppSelector(selectAllComments).filter(comment => comment.ticket_id === id);

  const uniqTicketStatus = useAppSelector(getUniqTicketStatus);
  const attachmentsStatus = useAppSelector(getAttachmentsStatus);
  const commentsStatus = useAppSelector(getCommentsStatus);
  const referenceDataStatus = useAppSelector(getReferenceDataStatus);
  const petrolStationsStatus = useAppSelector(getPetrolStationsStatus);

  const isLoading = uniqTicketStatus.isLoading || attachmentsStatus.isLoading || commentsStatus.isLoading || referenceDataStatus.isLoading || petrolStationsStatus.isLoading;
  const isIdle = uniqTicketStatus.isIdle || referenceDataStatus.isIdle || petrolStationsStatus.isIdle;
  const isError = uniqTicketStatus.isError || attachmentsStatus.isError || commentsStatus.isError || referenceDataStatus.isError || petrolStationsStatus.isError;

  const map = new Map(Object.entries(statusesEntities));

  useEffect(() => {
    dispatch(fetchUniqTicketData(id));
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

      if (ticket.attachments && ticket.attachments.length > 0 && attachmentsStatus.isIdle) {
        dispatch(fetchTicketAttachmentData(ticket.attachments));
      }

      if (commentsStatus.isIdle) {
        dispatch(fetchTicketCommentsData(ticket.comments));
      }
    }
  }, [uniqTicketStatus.isSuccess, ticket, dispatch, referenceDataStatus.isIdle, petrolStationsStatus.isIdle, commentsStatus.isIdle, attachmentsStatus.isIdle, id]);

  if (isLoading || isIdle) {
    return <Spinner fullscreen />;
  }

  return (
    <PageLayout>
      {
        (isError || !ticket) ?
          <Typography variant="h6" color="error">
            Произошла ошибка при загрузке данных тикета.
          </Typography> : (
            <Single>
              <Single.MainContent>
                <Single.Title>{ticket.title}</Single.Title>
                <Single.Section>
                  <Single.Item label="Описание">
                    <Typography>{ticket.description}</Typography>
                  </Single.Item>
                  <Single.Item label="АЗС">
                    <Chip label={petrolStation?.user?.user_name || 'Не указано'} />
                  </Single.Item>
                  <Single.Item label="Статус">
                    <Chip label={statusesEntities[ticket.status_id || ''].description || 'Не указано'} />
                  </Single.Item>
                  <Single.Item label="Категория">
                    <Chip label={ticketCategory?.description || 'Не указано'} />
                  </Single.Item>
                  <Single.Item label="Заявленная дата исполнения">
                    {ticket.deadline ? dayjs(ticket.deadline).format('DD.MM.YYYY') : 'Не указана'}
                  </Single.Item>
                </Single.Section>

                <Single.Attachments title="Вложения">
                  {(ticket.attachments && ticket.attachments.length === 0) && (
                    <Typography variant="body2">Вложения отсутствуют</Typography>
                  )}
                  {ticket.attachments && ticket.attachments.length > 0 && (
                    <Stack direction="row" spacing={2}>
                      {ticketAttachments.map(({ id, path }) => (
                        <AttachmentImageField key={id} id={id} path={path} imagSize={{ width: 200, height: 200 }} />
                      ))}
                    </Stack>
                  )}
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
                        <TableCell>Дата</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(ticket?.status_history || []).map(({ id: historyId, ticket_status, created_at }) => (
                        <TableRow key={historyId}>
                          <TableCell>
                            <Chip label={statusesEntities[ticket_status || ''].description || 'Не указано'} />
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
