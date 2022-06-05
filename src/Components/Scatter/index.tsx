import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  axisBottom,
  axisLeft,
  csv,
  DSVParsedArray,
  extent,
  max,
  min,
  scaleLinear,
  select,
} from "d3";

interface Row {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
  species: string;
}
export const Scatter = () => {
  useLayoutEffect(() => {
    // Tweakables
    const csvUrl =
      "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";
    const parseRow = (d: any) => {
      console.log(typeof d);

      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      return d;
    };
    const xValue = (d: Row) => d.petal_width;
    const yValue = (d: Row) => d.petal_length;
    const margin = { top: 80, right: 80, bottom: 60, left: 60 };
    const radius = 5;

    const svg = select("svg").attr("width", "100%").attr("height", "100vh");

    // Generic
    const main = async () => {
      const data: DSVParsedArray<Row> = await csv<Row>(csvUrl, parseRow);

      const x = scaleLinear()
        .domain(extent(data, xValue) as [number, number])
        .range([margin.left, innerWidth - margin.right]);

      const y = scaleLinear()
        .domain(extent(data, yValue) as [number, number])
        .range([innerHeight - margin.bottom, margin.top]);

      const marks = data.map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
      }));

      const color = (i: number) => {
        switch (data[i].species) {
          case "setosa":
            return "red";
          case "versicolor":
            return "blue";
          case "virginica":
            return "green";
        }
        return "black";
      };

      const circles = svg
        .selectAll("circle")
        .data(marks)
        .join("circle")
        .attr("cx", (d, i) => d.x)
        .attr("cy", (d, i) => d.y)
        .attr("r", radius)
        .attr("fill", (d, i) => color(i))
        .append("title")
        .text(
          (d, i) =>
            `Data
          species: ${data[i].species}
          sepal length: ${data[i].sepal_length}
          sepal width: ${data[i].sepal_width}
          petal length: ${data[i].petal_length}
          petal width: ${data[i].petal_width}
          `
        );

      svg
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${margin.left})`)
        .call(
          axisLeft(y)
            .tickSize(-innerWidth + margin.right + margin.left)
            .tickSizeOuter(0)
        );
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
        .call(
          axisBottom(x)
            .tickSize(-innerHeight + margin.top + margin.bottom)
            .tickSizeOuter(0)
        );

      svg
        .append("text")
        .text("Petal Width")
        .attr("x", innerWidth - margin.right * 2)
        .attr("y", innerHeight - margin.bottom / 4);

      svg
        .append("text")
        .text("Petal Length")
        .attr("x", margin.left / 2)
        .attr("y", margin.top / 2);
    };

    main();
  }, []);

  return (
    <div style={{ padding: 0 }}>
      <svg></svg>
    </div>
  );
};
