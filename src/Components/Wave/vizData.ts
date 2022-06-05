import { BaseType, Selection } from "d3";
import { IData } from "../../interfaces";

export const vizData = (
  selection: Selection<BaseType, unknown, HTMLElement, any>,
  data: IData[]
) => {
  selection
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", (d) => d.r)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);
};
