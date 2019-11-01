import { bubbleSort } from "../src/services/sorters/bubbleSort";
import { insertionSort } from "../src/services/sorters/insertionSort";
import { selectionSort } from "../src/services/sorters/selectionSort";

test("test bubble sort", () => {
  const array = [104, 1, 9, 7, 2];
  const result = bubbleSort(array);
  expect(result).toEqual([1, 2, 7, 9, 104]);
});

test("test insertion sort", () => {
  const array = [104, 1, 9, 7, 2];
  const result = insertionSort(array);
  expect(result).toEqual([1, 2, 7, 9, 104]);
});

test("test selection sort", () => {
  const array = [104, 1, 9, 7, 2];
  const result = selectionSort(array);
  expect(result).toEqual([1, 2, 7, 9, 104]);
});
