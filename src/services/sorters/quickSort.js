export function quickSort(array = []) {
  const sorted = JSON.parse(JSON.stringify(array));
  quickSortCall(sorted, 0, array.length - 1);
  return sorted;
}

function quickSortCall(array = [], low = 0, high = array.length - 1) {
  if (low >= high) {
    return array;
  }
  const partition = getPartition(array, low, high);
  quickSortCall(array, low, partition);
  quickSortCall(array, partition + 1, high);
}

function getPartition(array, low, high) {
  const pivotIndex = Math.floor(low + (high - low) / 2);
  const pivot = array[pivotIndex]; // getPivot(array, low, high);
  let i = low - 1;
  let j = high + 1;
  while (true) {
    do {
      i++;
    } while (array[i] < pivot);
    do {
      j--;
    } while (array[j] > pivot);
    if (i >= j) {
      return j;
    }
    swap(array, i, j);
  }
}

/* function getPivot(array, low, high) {
  const mid = (low + high) / 2;
  if (array[mid] < array[low]) {
    swap(array, mid, low);
  }
  if (array[high] < array[low]) {
    swap(array, high, low);
  }
  if (array[mid] < array[high]) {
    swap(array, mid, high);
  }
  return array[high];
} */

function swap(array, i, j) {
  const iValue = array[i];
  array[i] = array[j];
  array[j] = iValue;
}

export function quickSortIterator(
  array = [],
  low = 0,
  high = array.length - 1
) {
  let sorted = JSON.parse(JSON.stringify(array));
  let count = 0;
  let partitionIt;
  if (low < high) {
    partitionIt = partitionIterator(sorted, low, high);
  }
  let partitionResult;
  let partitionIndex;
  let leftPartQuickSortIt;
  let rightPartQuickSortIt;
  let leftPartQuickSortResult;
  let rightPartQuickSortResult;
  const iterator = {
    next: () => {
      try {
        if (low >= high) {
          return {
            value: {
              array: sorted,
              count
            },
            done: true
          };
        }
        count++;
        if (!partitionResult || !partitionResult.done) {
          partitionResult = partitionIt.next();
        }
        if (!partitionResult.done) {
          return {
            value: {
              array: partitionResult.value.array,
              index1: partitionResult.value.i,
              index2: partitionResult.value.j,
              index3: partitionResult.value.pivotIndex,
              count
            },
            done: false
          };
        }
        if (partitionIndex === undefined) {
          partitionIndex = partitionResult.value.partitionIndex;
          sorted = partitionResult.value.array;
        }
        if (!leftPartQuickSortIt) {
          leftPartQuickSortIt = quickSortIterator(sorted, low, partitionIndex);
        }
        if (!leftPartQuickSortResult || !leftPartQuickSortResult.done) {
          leftPartQuickSortResult = leftPartQuickSortIt.next();
          let result = JSON.parse(JSON.stringify(leftPartQuickSortResult));
          sorted = result.value.array;
          result.done = false;
          result.value.count = count;
          return result;
        }
        if (leftPartQuickSortResult && leftPartQuickSortResult.done) {
          if (!rightPartQuickSortIt) {
            rightPartQuickSortIt = quickSortIterator(
              sorted,
              partitionIndex + 1,
              high
            );
          }
          if (!rightPartQuickSortResult || !rightPartQuickSortResult.done) {
            rightPartQuickSortResult = rightPartQuickSortIt.next();
            let result = JSON.parse(JSON.stringify(rightPartQuickSortResult));
            sorted = result.value.array;
            result.value.count = count;
            return result;
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return iterator;
}

export function partitionIterator(array, low, high) {
  const pivotIndex = Math.floor(low + (high - low) / 2);
  let pivot;
  if (pivotIndex >= 0) {
    pivot = array[pivotIndex].value;
  }
  let i = low;
  let j = high;
  const iterator = {
    next() {
      if (array[i].value < pivot) {
        const returnValue = {
          value: { array, pivotIndex, i, j },
          done: false
        };
        i++;
        return returnValue;
      }
      if (array[j].value > pivot) {
        const returnValue = {
          value: { array, pivotIndex, i, j },
          done: false
        };
        j--;
        return returnValue;
      }
      if (i >= j) {
        return {
          value: { array, pivotIndex, partitionIndex: j },
          done: true
        };
      }
      swap(array, i, j);
      i++;
      j--;
      const returnValue = {
        value: { array, pivotIndex, i, j },
        done: false
      };
      return returnValue;
    }
  };
  return iterator;
}
