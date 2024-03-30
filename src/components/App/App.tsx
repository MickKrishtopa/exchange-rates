import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";

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
      console.log("effect1");
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
  }, [controlPanelValues]);

  useEffect(() => {
    console.log("DATA", data);

    const start = controlPanelValues?.startDate;

    const end = controlPanelValues?.endDate;

    console.log("range", start, end);
    setDataToShow(
      data
        ? data
            .sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              return dateA - dateB;
            })
            .filter((item) => {
              console.log(item);
            })
        : null
    );
  }, [controlPanelValues, data]);

  return (
    <>
      <Header />
      <Flex as="main" width="100%">
        <ControlPanel changeHandler={changeFiltresHandler} />
        {dataToShow && controlPanelValues?.checkedItem && (
          <Chart
            data={dataToShow}
            selectedСurrencies={controlPanelValues?.checkedItem}
          />
        )}
      </Flex>
      <Flex>{`Число запросов к API: ${fetchCounter}`}</Flex>
    </>
  );
}

export default App;

