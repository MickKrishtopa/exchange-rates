import { useEffect, useState } from "react";
import { Flex, Box, Checkbox, Stack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IControlPanel } from "../../helpers/types";

const currentDate = new Date();
const weekAgoDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

type Props = {
  changeHandler: (state: IControlPanel) => void;
};

const ControlPanel = ({ changeHandler }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(weekAgoDate);
  const [endDate, setEndDate] = useState<Date | null>(currentDate);
  const [checkedItem, setCheckedItem] = useState({
    eurRub: false,
    usdRub: false,
    cnyRub: false,
  });

  const handleChangeChecbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id as "usdRub" | "eurRub" | "cnyRub";
    setCheckedItem((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const panelValue: IControlPanel = {
      startDate,
      endDate,
      checkedItem,
    };

    changeHandler(panelValue);
  }, [startDate, endDate, checkedItem]);

  return (
    <Flex flexDirection="column" width="30%">
      <Stack spacing={5} marginBottom="20px">
        <Checkbox
          id="eurRub"
          isChecked={checkedItem.eurRub}
          onChange={(e) => handleChangeChecbox(e)}
        >
          Евро
        </Checkbox>
        <Checkbox
          id="usdRub"
          isChecked={checkedItem.usdRub}
          onChange={(e) => handleChangeChecbox(e)}
        >
          Доллар
        </Checkbox>
        <Checkbox
          id="cnyRub"
          isChecked={checkedItem.cnyRub}
          onChange={(e) => handleChangeChecbox(e)}
        >
          Юань
        </Checkbox>
      </Stack>

      <Flex flexDirection="column" gap="10px" alignItems="start">
        <Box>Начальная дата:</Box>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />

        <Box>Конечная дата:</Box>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </Flex>
    </Flex>
  );
};

export { ControlPanel };
