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
import { quickSortIterator } from "../services/sorters/quickSort";

export default function Dashboard() {
  const viewHeight = 200;
  const timeout = 100;

  const [maxNumbers, setMaxNumbers] = useState(20);
  const [initialData, setInitialData] = useState([]);
  const [totalSorters, setTotalSorters] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [bubbleSortData, setBubbleSortData] = useState({ array: [] });
  const [insertionSortData, setInsertionSortData] = useState({ array: [] });
  const [selectionSortData, setSelectionSortData] = useState({ array: [] });
  const [quickSortData, setQuickSortData] = useState({ array: [] });
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
    console.log("orig array:", array.map(d => d.value));
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
    setQuickSortData({ array });
  }

  function doSort() {
    doBubbleSort();
    doInsertionSort();
    doSelectionSort();
    doQuickSort();
  }

  function reset() {
    setData(initialData);
  }

  function doBubbleSort() {
    const iterator = bubbleSortIterator(bubbleSortData.array);
    callNext(iterator, setBubbleSortData, true);
  }

  function doInsertionSort() {
    try {
      const iterator = insertionSortIterator(insertionSortData.array);
      callNext(iterator, setInsertionSortData, true);
    } catch (err) {
      console.log(err);
    }
  }

  function doSelectionSort() {
    try {
      const iterator = selectionSortIterator(selectionSortData.array);
      callNext(iterator, setSelectionSortData, true);
    } catch (err) {
      console.log(err);
    }
  }

  function doQuickSort() {
    try {
      const iterator = quickSortIterator(quickSortData.array);
      callNext(iterator, setQuickSortData, true);
    } catch (err) {
      console.log(err);
    }
  }

  function callNext(iterator, setter, isFirstCall) {
    try {
      if (isFirstCall) {
        setTotalSorters(totalSorters => totalSorters + 1);
      }
      const next = iterator.next();
      const newData = {
        array: [...next.value.array],
        index1: next.value.index1,
        index2: next.value.index2,
        index3: next.value.index3,
        count: next.value.count
      };
      setter(newData);
      setTimeout(() => {
        if (!next.done) {
          callNext(iterator, setter);
        } else {
          setTotalDone(totalDone => totalDone + 1);
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
        <button
          className={sortButton}
          onClick={doSort}
          disabled={totalDone < totalSorters}
        >
          Sort
        </button>
        <button
          className={sortButton}
          onClick={reset}
          disabled={totalDone < totalSorters}
        >
          Reset
        </button>
        <button
          className={sortButton}
          onClick={generate}
          disabled={totalDone < totalSorters}
        >
          Random
        </button>
        <div className={barCountInputWrapper}>
          <label>No. of Bars: </label>
          <input
            type="number"
            value={maxNumbers}
            onChange={event => {
              setMaxNumbers(event.target.value);
            }}
            disabled={totalDone < totalSorters}
          />
        </div>
      </div>
      <div className={grid}>
        <SortView
          title="Quicksort"
          viewHeight={viewHeight}
          data={quickSortData}
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
        <SortView
          title="Bubbble Sort"
          viewHeight={viewHeight}
          data={bubbleSortData}
        />
      </div>
    </div>
  );
}
