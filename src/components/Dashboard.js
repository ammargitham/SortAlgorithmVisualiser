import React, { useState, useEffect, useCallback } from "react";
import SortView from "./SortView";
import random from "lodash/random";
import times from "lodash/times";
import {
  Dashboard as DashboardClass,
  sortButton,
  grid,
  buttonsWrapper,
  barCountInputWrapper
} from "./Dashboard.module.scss";
import { bubbleSortIterator } from "../services/sorters/bubbleSort";
import { insertionSortIterator } from "../services/sorters/insertionSort";
import { selectionSortIterator } from "../services/sorters/selectionSort";

export default function Dashboard() {
  const viewHeight = 200;
  const timeout = 100;

  const [maxNumbers, setMaxNumbers] = useState(20);
  const [initialData, setInitialData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [bubbleSortData, setBubbleSortData] = useState({ array: [] });
  const [insertionSortData, setInsertionSortData] = useState({ array: [] });
  const [selectionSortData, setSelectionSortData] = useState({ array: [] });
  const generateRandom = max => {
    // const maxNumbers = random(10, 30);
    const array = times(max, i => ({
      id: i,
      value: random(10, 100) / 10
    }));
    return array;
  };

  const generate = useCallback(() => {
    const array = generateRandom(maxNumbers);
    setInitialData(array);
    setData(array);
  }, [maxNumbers]);

  useEffect(() => {
    generate();
  }, [generate]);

  function setData(array) {
    setBubbleSortData({ array });
    setInsertionSortData({ array });
    setSelectionSortData({ array });
  }

  function doSort() {
    doBubbleSort();
    doInsertionSort();
    doSelectionSort();
  }

  function reset() {
    setData(initialData);
  }

  function doBubbleSort() {
    const iterator = bubbleSortIterator(bubbleSortData.array);
    callNext(iterator, setBubbleSortData);
  }

  function doInsertionSort() {
    try {
      const iterator = insertionSortIterator(insertionSortData.array);
      callNext(iterator, setInsertionSortData);
    } catch (err) {
      console.log(err);
    }
  }

  function doSelectionSort() {
    try {
      const iterator = selectionSortIterator(selectionSortData.array);
      callNext(iterator, setSelectionSortData);
    } catch (err) {
      console.log(err);
    }
  }

  function callNext(iterator, setter) {
    try {
      const next = iterator.next();
      const newData = {
        array: [...next.value.array],
        index1: next.value.index1,
        index2: next.value.index2,
        count: next.value.count
      };
      setter(newData);
      setTimeout(() => {
        if (!next.done) {
          callNext(iterator, setter);
        } else {
          setter({ array: newData.array, count: newData.count });
        }
      }, timeout);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={DashboardClass}>
      <div className={buttonsWrapper}>
        <button className={sortButton} onClick={doSort}>
          Sort
        </button>
        <button className={sortButton} onClick={reset}>
          Reset
        </button>
        <button className={sortButton} onClick={generate}>
          Random
        </button>
        <div className={barCountInputWrapper}>
          <input
            type="number"
            value={maxNumbers}
            onChange={event => {
              setMaxNumbers(event.target.value);
            }}
          />
        </div>
      </div>
      <div className={grid}>
        <SortView
          title="Bubbble Sort"
          viewHeight={viewHeight}
          data={bubbleSortData}
        />
        <SortView
          title="Insertion Sort"
          viewHeight={viewHeight}
          data={insertionSortData}
        />
        <SortView
          title="Selection Sort"
          viewHeight={viewHeight}
          data={selectionSortData}
        />
      </div>
    </div>
  );
}
