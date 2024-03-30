import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

import { ICurrencies, IRatesData } from "../../helpers/types";
import { Box } from "@chakra-ui/react";

type Props = {
  data: IRatesData[] | null;
  selectedСurrencies: ICurrencies | null;
};

const colors = ["black", "blue", "green"];

const Chart = ({ data, selectedСurrencies }: Props) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!data || !selectedСurrencies) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
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

  return <Box width="80%" ref={chartContainerRef} />;
};

export { Chart };
