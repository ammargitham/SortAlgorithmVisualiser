import React from "react";
import Bar from "./Bar";
import { Flipper, Flipped } from "react-flip-toolkit";
import {
  SortView as SortViewClass,
  list,
  listItem
} from "./SortView.module.scss";

export default function SortView({ viewHeight, data, title }) {
  return (
    <div className={SortViewClass}>
      <h4>
        {title} <small>steps: {data.count}</small>
      </h4>
      <Flipper
        flipKey={data.array.map(d => d && d.value).join("")}
        spring="noWobble"
      >
        <ul className={list}>
          {data.array
            .filter(d => !!d)
            .map((d, i) => (
              <Flipped key={d.id} flipId={d.id}>
                <li className={listItem}>
                  <Bar
                    active={i === data.index1 || i === data.index2}
                    viewHeight={viewHeight}
                    height={d.value}
                    pivot={i === data.index3}
                  />
                </li>
              </Flipped>
            ))}
        </ul>
      </Flipper>
    </div>
  );
}
