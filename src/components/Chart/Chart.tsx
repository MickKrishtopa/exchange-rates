import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

import { ICurrencies, IRatesData } from "../../helpers/types";
import { Box } from "@chakra-ui/react";

type Props = {
  data: IRatesData[];
  selectedСurrencies: ICurrencies;
};

const colors = ["black", "blue", "green"];

const Chart = ({ data, selectedСurrencies }: Props) => {
  console.log(data, selectedСurrencies);
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  // console.log(data);
  // console.log("---------");
  // console.log(selectedСurrencies);

  useEffect(() => {
    if (!data) return;
    if (!selectedСurrencies) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    // const newSeries = chart.addLineSeries();
    // newSeries.setData([
    //   { time: "2024-03-22", value: 99.0644649127039 },

    //   { time: "2024-03-23", value: 99.5068935888206 },

    //   { time: "2024-03-24", value: 99.86956036720439 },

    //   { time: "2024-03-25", value: 98.23367019950965 },

    //   { time: "2024-03-26", value: 99.69683190386354 },

    //   { time: "2024-03-27", value: 98.95513275325835 },

    //   { time: "2024-03-28", value: 99.42383885384199 },

    //   { time: "2024-03-29", value: 98.68845997349031 },
    // ]);

    Object.keys(selectedСurrencies).forEach((cur, i) => {
      if (selectedСurrencies[cur]) {
        const newSeries = chart.addLineSeries({ color: colors[i] });
        const formattedData = data.map((day) => {
          return {
            time: day.date,
            value: day[cur],
          };
        });
        console.log(formattedData);
        newSeries.setData([
          { time: "2024-03-22", value: 99.0644649127039 },

          { time: "2024-03-23", value: 99.5068935888206 },

          { time: "2024-03-24", value: 99.86956036720439 },

          { time: "2024-03-25", value: 98.23367019950965 },

          { time: "2024-03-26", value: 99.69683190386354 },

          { time: "2024-03-27", value: 98.95513275325835 },

          { time: "2024-03-28", value: 99.42383885384199 },

          { time: "2024-03-29", value: 98.68845997349031 },
        ]);
      }
    });

    return () => {
      chart.remove();
    };
  }, [data, selectedСurrencies]);

  return <Box width="60%" ref={chartContainerRef} />;
};

export { Chart };
