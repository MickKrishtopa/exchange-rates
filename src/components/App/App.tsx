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
        fetchDataForDate(date).then((res) => {
          if (!res) return;
          setData((prev) => (prev ? [...prev, res] : [res]));
        });
      });
    }
  }, [controlPanelValues]);
  return (
    <>
      <Header />
      <Flex as="main" width="100%">
        <ControlPanel changeHandler={changeFiltresHandler} />
        {/* {data && controlPanelValues?.checkedItem && ( */}
        {true && (
          <Chart
            data={data}
            selectedСurrencies={controlPanelValues?.checkedItem}
          />
        )}
      </Flex>
    </>
  );
}

export default App;

