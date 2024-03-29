export const fetchDataForDate = async (date: string) => {
  try {
    const res = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/rub.json`
    ).then((res) => res.json());

    const data = {
      date: res.date,
      usdRub: 1 / res.rub.usd,
      eurRub: 1 / res.rub.eur,
      cnyRub: 1 / res.rub.cny,
    };

    return data;
  } catch (error) {
    console.log(error);
  }
};
