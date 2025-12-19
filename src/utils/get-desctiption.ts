const getDescription = (id: string | undefined, data: { id: string, description: string }[]) => {
  const item = data.find((entry) => entry.id === id);
  return item ? item.description : 'Неизвестно';
};

export default getDescription