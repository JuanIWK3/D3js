import { range } from "d3";
import { IData } from "../../interfaces";

export const makeData = (t: number) => {
  const data: IData[] = range(100).map((d) => ({
    x: d * 50 + 50,
    y: 500 + Math.sin(d * 0.5 + t) * 220,
    r: 20 + Math.sin(d * 0.5 + t * 2) * 10,
  }));

  return data;
};
