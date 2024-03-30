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
  // console.log(data, selectedСurrencies);
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

    Object.keys(selectedСurrencies).forEach((cur, i) => {
      if (selectedСurrencies[cur]) {
        const newSeries = chart.addLineSeries({ color: colors[i] });
        const formattedData = data
          .map((day) => {
            return {
              time: day.date,
              value: day[cur],
            };
          })
          .sort((a, b) => {
            const dateA = new Date(a.time).getTime();
            const dateB = new Date(b.time).getTime();
            return dateA - dateB;
          });
        console.log(formattedData);

        newSeries.setData(formattedData);
      }
    });

    return () => {
      chart.remove();
    };
  }, [data, selectedСurrencies]);

  return <Box width="60%" ref={chartContainerRef} />;
};

export { Chart };
