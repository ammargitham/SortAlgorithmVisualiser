import React from "react";
import { barColor, activeBarColor } from "./Bar.module.scss";

export default function Bar({ viewHeight, height, active }) {
  const hMax = 100;
  const width = 5;
  const viewBox = "0 0 " + width + " " + hMax;
  const hPc = ((10 * height) / hMax) * 100;
  const yPc = 100 - hPc;

  return (
    <svg
      width="100%"
      height={viewHeight}
      preserveAspectRatio="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y={yPc + "%"}
        width="100%"
        height={hPc + "%"}
        fill={active ? activeBarColor : barColor}
      />
    </svg>
  );
}
