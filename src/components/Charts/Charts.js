import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import styles from "./charts.module.css";
import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const Charts = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((d) => ({
          confirmed: d.confirmed.total,
          deaths: d.deaths.total,
          date: d.reportDate,
        }));
        setDailyData(modifiedData);
      } catch (error) {
        return error;
      }
    };
    fetchChartData();
  }, []);

  const barChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(255,0,0,0.5)",
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Charts;
