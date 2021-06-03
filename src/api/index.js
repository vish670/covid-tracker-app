import axios from "axios";
const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(changeableUrl);
    return { confirmed, deaths, recovered, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchChartData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((d) => ({
      confirmed: d.confirmed.total,
      deaths: d.deaths.total,
      date: d.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountryData = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((c) => c.name);
  } catch (error) {
    return error;
  }
};
