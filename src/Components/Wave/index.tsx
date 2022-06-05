import React, { useLayoutEffect } from "react";
import { BaseType, range, select, Selection } from "d3";
import { vizData } from "./vizData";
import { makeData } from "./makeData";

export const Wave = () => {
  useLayoutEffect(() => {
    const svgWidth = "100vw";
    const svgHeight = "100vh";
    const svg = select("svg").attr("width", svgWidth).attr("height", svgHeight);

    let t = 0;

    setInterval(() => {
      const data = makeData(t);
      svg.call(vizData, data);
      t = t + 0.01;
      if (t > 10) {
        t = 0;
      }
    }, 1000 / 60);
  }, []);

  return <svg></svg>;
};
