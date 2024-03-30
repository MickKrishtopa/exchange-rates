import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import { Chart } from "../Chart/Chart";
import { ControlPanel } from "../ControlPanel/ControlPanel";
import { Header } from "../Header/Header";
import { fetchDataForDate } from "../../api/api";

import "./App.css";
import { getDatesInRange } from "../../helpers/getDatesInRange";
import { IControlPanel } from "../../helpers/types";
import { IRatesData } from "../../helpers/types";

function App() {
  const [data, setData] = useState<IRatesData[] | null>(null);
  const [dataToShow, setDataToShow] = useState<IRatesData[] | null>(null);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [controlPanelValues, setControlPanelValues] =
    useState<IControlPanel | null>(null);

  const changeFiltresHandler = (param: IControlPanel) => {
    setControlPanelValues(param);
  };

  useEffect(() => {
    if (controlPanelValues?.startDate && controlPanelValues?.endDate) {
      const dataRange = getDatesInRange(
        controlPanelValues?.startDate,
        controlPanelValues?.endDate
      );

      dataRange.forEach((date) => {
        if (data?.some((day) => day.date === date)) return;
        fetchDataForDate(date).then((res) => {
          if (!res) return;
          setData((prev) => {
            return prev ? [...prev, res] : [res];
          });
        });
        setFetchCounter((prev) => prev + 1);
      });
    }
    // eslint-disable-next-line
  }, [controlPanelValues]);

  useEffect(() => {
    if (!controlPanelValues) return;

    console.log("DATA", data);
    console.log("DATA", controlPanelValues.startDate);

    setDataToShow(
      data
        ? data
            .sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return dateA - dateB;
            })
            .filter((item) => {
              if (!controlPanelValues.startDate || !controlPanelValues.endDate)
                return;

              const curDate = new Date(item.date).getTime();
              return (
                curDate >= controlPanelValues.startDate.getTime() &&
                curDate <= controlPanelValues.endDate.getTime()
              );
            })
        : null
    );
  }, [controlPanelValues, data]);

  return (
    <>
      <Header />
      <Flex as="main" width="100%">
        <ControlPanel changeHandler={changeFiltresHandler} />

        <Chart
          data={dataToShow}
          selectedСurrencies={
            controlPanelValues ? controlPanelValues.checkedItem : null
          }
        />
      </Flex>
      <Flex>{`Число запросов к API: ${fetchCounter}`}</Flex>
    </>
  );
}

export default App;
