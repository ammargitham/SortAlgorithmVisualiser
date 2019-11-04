import { bubbleSort } from "../src/services/sorters/bubbleSort";
import { insertionSort } from "../src/services/sorters/insertionSort";
import { selectionSort } from "../src/services/sorters/selectionSort";
import {
  quickSort,
  quickSortIterator,
  partitionIterator
} from "../src/services/sorters/quickSort";

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

test("test quick sort", () => {
  const array = [104, 1, 9, 7, 2];
  const result = quickSort(array);
  expect(result).toEqual([1, 2, 7, 9, 104]);
});

/* test("test quick sort iterator", () => {
  // const array = [104, 11, 92, 7, 2, 23, 54, 232, 103];
  const array = [
    7.9,
    9.1,
    8.1,
    1.5,
    7.6,
    5.4,
    5.4,
    6.6,
    2.3,
    8.9,
    10,
    4.1,
    9.4,
    2.4,
    6,
    7.2,
    2.2,
    2.9,
    7.3,
    8.4
  ];
  const iterator = quickSortIterator(array);
  let result = iterator.next();
  while (!result.done && result.value.count <= 1000) {
    result = iterator.next();
    console.log(JSON.stringify(result));
  }
  expect(result.value.array).toEqual([2, 7, 11, 23, 54, 92, 103, 104, 232]);
});*/

/* test("test quick sort partition iterator", () => {
  const array = [
    6.4,
    1.1,
    6.5,
    3.3,
    7.5,
    9.4,
    8.2,
    2.6,
    9,
    9,
    1.4,
    8.6,
    7.1,
    5.5,
    3.5,
    8,
    2,
    8,
    5.4,
    7.8
  ].map((v, i) => {
    return {
      id: i,
      value: v
    };
  });
  const iterator = partitionIterator(array, 0, array.length - 1);
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
  console.log(
    JSON.stringify(result.value.array.map(d => d.value)),
    result.value.partitionIndex,
    result.value.pivotIndex
  );
});

test("test quick sort partition iterator", () => {
  const array = [
    1.3,
    8.3,
    7.7,
    7.6,
    5.6,
    3.4,
    3.4,
    3.3,
    7,
    2,
    8.2,
    2.7,
    7.8,
    2.8,
    2.9,
    7.9,
    4.2,
    5.7,
    3.5
  ].map((v, i) => {
    return {
      id: i,
      value: v
    };
  });
  const iterator = partitionIterator(array, 0, array.length - 1);
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
  console.log(
    JSON.stringify(result.value.array.map(d => d.value)),
    result.value.partitionIndex,
    result.value.pivotIndex
  );
});

test("test quick sort partition iterator", () => {
  const array = [
    1,
    2.5,
    2.6,
    1.1,
    3,
    8,
    6.6,
    8.3,
    9.5,
    3.6,
    7.1,
    7.6,
    7.1,
    5,
    5.6,
    4.2,
    5.6,
    3.9,
    9.4,
    5.7
  ].map((v, i) => {
    return {
      id: i,
      value: v
    };
  });
  const iterator = partitionIterator(array, 0, array.length - 1);
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
  console.log(
    JSON.stringify(result.value.array.map(d => d.value)),
    result.value.partitionIndex,
    result.value.pivotIndex
  );
});

test("test quick sort partition iterator", () => {
  const array = [1, 1.5, 2.3, 1, 2.7, 2.8, 2.1].map((v, i) => {
    return {
      id: i,
      value: v
    };
  });
  const iterator = partitionIterator(array, 0, array.length - 1);
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
  console.log(
    JSON.stringify(result.value.array.map(d => d.value)),
    result.value.partitionIndex,
    result.value.pivotIndex
  );
});

test("test quick sort partition iterator", () => {
  const array = [2.1, 2.1].map((v, i) => {
    return {
      id: i,
      value: v
    };
  });
  const iterator = partitionIterator(array, 0, array.length - 1);
  let result = iterator.next();
  while (!result.done) {
    result = iterator.next();
  }
  console.log(
    JSON.stringify(result.value.array.map(d => d.value)),
    result.value.partitionIndex,
    result.value.pivotIndex
  );
}); */

test("test quick sort iterator", () => {
  // const array = [104, 11, 92, 7, 2, 23, 54, 232, 103];
  const array = [
    1,
    1.1,
    1.9,
    2.1,
    2.1,
    2.2,
    3.3,
    2.5,
    4.6,
    3,
    3.8,
    3.2,
    5.6,
    6.9,
    5.7,
    7.6,
    8,
    9.3,
    8.1,
    8.5
  ].map((v, i) => {
    return {
      id: i,
      value: v
    };
  });
  const iterator = quickSortIterator(array);
  let result = iterator.next();
  while (!result.done && result.value.count <= 1000) {
    result = iterator.next();
    // console.log(result.value.array.map(d => d.value).slice());
  }
  console.log(result.value.array.map(d => d.value).slice());
  // expect(result.value.array).toEqual([2, 7, 11, 23, 54, 92, 103, 104, 232]);
});
