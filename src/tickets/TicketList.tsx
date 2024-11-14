import {
  DatagridConfigurable,
  DateField,
  ExportButton,
  Exporter,
  List,
  SelectColumnsButton,
  TextField,
  TopToolbar,
  downloadCSV,
  useStore,
  FunctionField,
} from "react-admin";
import { Card, CardContent, Chip } from '@mui/material';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ClassIcon from '@mui/icons-material/Class';
import { FilterSection } from "../filter-section/filter-section";
import { CategoryType, PetrolStationType, StatusType, TicketType } from "../types";
import jsonExport from 'jsonexport/dist';
import { StoreKey } from "../preload-data/preload-data";
import { RecordType } from "zod";

const getDescription = (id: string | undefined, data: (CategoryType | StatusType)[]) => {
  const item = data.find((entry) => entry.id === id);
  return item ? item.description : 'Неизвестно';
};

const TicketFilterSidebar = () => {
  const [categoryData] = useStore<CategoryType[]>(StoreKey.CATEGORY_DATA, []);
  const [statusData] = useStore<CategoryType[]>(StoreKey.STATUS_DATA, []);

  const statusesOptions = statusData.map((status) => ({ label: status.description, value: status.id }))
  const categoriesOptions = categoryData?.map((category) => ({ label: category.description, value: category.id }))

  return (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 220 }}>
      <CardContent>
        <FilterSection
          label="Категория"
          icon={<ClassIcon />}
          filterKey="ticket_category"
          filterOptions={categoriesOptions}
        />

        <FilterSection
          label="Статус"
          icon={<LabelImportantIcon />}
          filterKey="status_id"
          filterOptions={statusesOptions}
        />

      </CardContent>
    </Card>
  )
};

const exporter: Exporter = (tickets: TicketType[]) => {
  const ticketsForExport = tickets.map(ticket => {
    const { id, ...ticketForExport } = ticket;

    return ticketForExport;
  });

  jsonExport(ticketsForExport, {
    rowDelimiter: ';',
  }, (err, csv) => {
    downloadCSV(csv, 'tickets'); // download as 'posts.csv` file
  });
}

const TicketListActions = () => {
  return (
    <TopToolbar>
      <SelectColumnsButton />
      <ExportButton />
    </TopToolbar>
  )
}

export const TicketList = () => {
  const [categoryData] = useStore<CategoryType[]>(StoreKey.CATEGORY_DATA, []);
  const [statusData] = useStore<CategoryType[]>(StoreKey.STATUS_DATA, []);
  const [petrolStationData] = useStore<PetrolStationType[]>(StoreKey.PETROL_STATION_DATA, []);

  return (
    <List
      aside={<TicketFilterSidebar />}
      exporter={exporter}
      sort={{ field: "created_at", order: "DESC" }}
      perPage={25}
      actions={<TicketListActions />}
    > 
      <DatagridConfigurable
        rowClick="show"
        sx={{
          "& .column-lock": {
            padding: "6px 0",
            "& svg": { verticalAlign: "middle" },
          },
        }}
        bulkActionButtons={false}
      >
        <TextField source="title" label="Название" />

        <FunctionField
          label="АЗС"
          render={(record: TicketType) => {
            const item = petrolStationData.find((entry) => entry.id === record.petrol_station_id);
            return item?.user ? item.user?.user_name : 'Неизвестно';
          }}
        />

        <FunctionField
          label="Статуc"
          render={(record: TicketType) => (
            <Chip label={getDescription(record.status_id, statusData)} />
          )}
        />

        <FunctionField
          label="Категория"
          render={(record: TicketType) => (
            <Chip label={getDescription(record.ticket_category, categoryData)} />
          )}
        />


        <DateField source="deadline" label="Заявленная дата исполнения" />
        <DateField source="created_at" label="Создана" />
      </DatagridConfigurable>
    </List>
  );
};


