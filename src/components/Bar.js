import React from "react";
import { barColor, activeBarColor, pivotColor } from "./Bar.module.scss";

export default function Bar({ viewHeight, height, active, pivot }) {
  const hMax = 100;
  const width = 5;
  const viewBox = "0 0 " + width + " " + hMax;
  const hPc = ((10 * height) / hMax) * 100;
  const yPc = 100 - hPc;
  function getColor() {
    if (pivot) {
      return pivotColor;
    }
    return active ? activeBarColor : barColor;
  }
  return (
    <svg
      width="100%"
      height={viewHeight}
      preserveAspectRatio="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y={yPc + "%"} width="100%" height={hPc + "%"} fill={getColor()} />
    </svg>
  );
}
