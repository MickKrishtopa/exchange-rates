const getDatesInRange = (startDate: Date, endDate: Date) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export { getDatesInRange };
