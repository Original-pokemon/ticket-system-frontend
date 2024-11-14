import { useEffect } from 'react';
import { useStore, useDataProvider } from 'react-admin';
import { BushType, CategoryType, PetrolStationType, StatusType } from '../types';

export const StoreKey = {
  STATUS_DATA: 'statusData',
  CATEGORY_DATA: 'categoryData',
  PETROL_STATION_DATA: 'petrolStationData',
  BUSH_DATA: 'bushData',
} as const

const PreloadData = () => {
  const dataProvider = useDataProvider();
  const [bushData, setBushData] = useStore<BushType[]>(StoreKey.BUSH_DATA, []);
  const [petrolStationData, setPetrolStationData] = useStore<PetrolStationType[]>(StoreKey.PETROL_STATION_DATA, []);
  const [statusData, setStatusData] = useStore<StatusType[]>(StoreKey.STATUS_DATA, []);
  const [categoryData, setCategoryData] = useStore<CategoryType[]>(StoreKey.CATEGORY_DATA, []);

  useEffect(() => {
    const fetchData = async () => {
      if (bushData.length === 0) {
        const { data } = await dataProvider.getList('bush', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} });
        setBushData(data);
      }
      if (petrolStationData.length === 0) {
        const { data } = await dataProvider.getList('petrol-station', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} });
        setPetrolStationData(data);
      }
      if (statusData.length === 0) {
        const { data } = await dataProvider.getList('status', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} });
        setStatusData(data);
      }
      if (categoryData.length === 0) {
        const { data } = await dataProvider.getList<CategoryType>('category', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' }, filter: {} });
        setCategoryData(data);
      }
    };

    fetchData();
  }, [dataProvider, bushData, statusData, categoryData, setBushData, setStatusData, setCategoryData]);

  return null;
};

export default PreloadData;
