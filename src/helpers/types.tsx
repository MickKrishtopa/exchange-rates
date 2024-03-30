export interface IControlPanel {
  startDate: Date | null;
  endDate: Date | null;
  checkedItem: ICurrencies;
}

export interface IRatesData {
  [key: string]: string | number;
  date: string;
  usdRub: number;
  eurRub: number;
  cnyRub: number;
}

export interface ICurrencies {
  [key: string]: boolean;
  usdRub: boolean;
  eurRub: boolean;
  cnyRub: boolean;
}
