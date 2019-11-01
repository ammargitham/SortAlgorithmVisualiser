export function bubbleSort(array) {
  const sorted = JSON.parse(JSON.stringify(array));
  for (let index1 = 0; index1 < array.length - 2; index1++) {
    for (let index2 = 0; index2 < array.length - 1; index2++) {
      const a = sorted[index2];
      const b = sorted[index2 + 1];
      if (a > b) {
        sorted[index2] = b;
        sorted[index2 + 1] = a;
      }
    }
  }
  return sorted;
}

export function bubbleSortIterator(array = []) {
  let cycle = 0;
  let index = 0;
  const sorted = JSON.parse(JSON.stringify(array));
  let count = 0;
  let swapped = false;
  const rangeIterator = {
    next: () => {
      if (index === array.length - 1) {
        if (!swapped) {
          // dont do further checks, as array is already sorted
          return {
            value: {
              array: sorted,
              count
            },
            done: true
          };
        }
        swapped = false;
        cycle++;
        index = 0;
      }
      if (cycle === array.length - 2) {
        return {
          value: {
            array: sorted,
            count
          },
          done: true
        };
      }
      count++;
      const index1 = index;
      const index2 = index + 1;
      const s1 = sorted[index1];
      const s2 = sorted[index2];
      const a = s1.value;
      const b = s2.value;
      try {
        if (a === b || a < b) {
          return {
            value: {
              array: sorted,
              index1,
              index2,
              count
            },
            done: false
          };
        }
        sorted[index1] = s2;
        sorted[index2] = s1;
        swapped = true;
        return {
          value: {
            array: sorted,
            index1,
            index2,
            count
          },
          done: false
        };
      } finally {
        index++;
      }
    }
  };
  return rangeIterator;
}

export function insertionSort(array) {
  const sorted = JSON.parse(JSON.stringify(array));
  let partialSortEnd = -1;
  while (partialSortEnd !== array.length - 1) {
    const i = partialSortEnd + 1;
    const a = sorted[i];
    for (let i2 = 0; i2 < i; i2++) {
      const b = sorted[i2];
      if (a < b) {
        sorted.splice(i, 1);
        sorted.splice(i2, 0, a);
        break;
      }
    }
    partialSortEnd++;
  }
  return sorted;
}

export function insertionSortIterator(array = []) {
  const sorted = JSON.parse(JSON.stringify(array));
  let partialSortEnd = -1;
  let index2 = 0;
  let count = 0;
  const iterator = {
    next: () => {
      count++;
      let index1 = partialSortEnd + 1;
      const s1 = sorted[index1];
      const s2 = sorted[index2];
      const a = s1.value;
      const b = s2.value;
      let found = false;
      try {
        if (a < b) {
          sorted.splice(index1, 1);
          sorted.splice(index2, 0, s1);
          index1 = index2;
          found = true;
          return {
            value: {
              array: sorted,
              index1,
              index2,
              count
            },
            done: false
          };
        }
        return {
          value: {
            array: sorted,
            index1,
            index2,
            count
          },
          done: false
        };
      } finally {
        index2++;
        if (found || index2 >= index1) {
          index2 = 0;
          partialSortEnd++;
          if (partialSortEnd === array.length - 1) {
            return {
              value: {
                array: sorted,
                index1,
                index2,
                count
              },
              done: true
            };
          }
        }
      }
    }
  };
  return iterator;
}

export function selectionSort(array) {
  const sorted = JSON.parse(JSON.stringify(array));
  let nextInsertIndex = 0;
  try {
    while (nextInsertIndex < array.length) {
      let currentMinIndex = nextInsertIndex;
      let currentMinValue = sorted[currentMinIndex];
      for (let index = currentMinIndex + 1; index < array.length; index++) {
        if (sorted[index] < currentMinValue) {
          currentMinIndex = index;
          currentMinValue = sorted[index];
        }
      }
      sorted[currentMinIndex] = sorted[nextInsertIndex];
      sorted[nextInsertIndex] = currentMinValue;
      nextInsertIndex++;
    }
  } catch (err) {
    console.log(err);
  }
  return sorted;
}

export function selectionSortIterator(array = []) {
  const sorted = JSON.parse(JSON.stringify(array));
  let nextInsertIndex = 0;
  let currentMinIndex = nextInsertIndex;
  let currentMinValue = sorted[currentMinIndex];
  let index = currentMinIndex + 1;
  let count = 0;
  const iterator = {
    next: () => {
      count++;
      let foundMin = false;
      try {
        if (sorted[index].value < currentMinValue.value) {
          foundMin = true;
        }
        return {
          value: {
            array: sorted,
            index1: currentMinIndex,
            index2: index,
            count
          },
          done: false
        };
      } catch (err) {
        console.error(err.message);
      } finally {
        if (foundMin) {
          currentMinIndex = index;
          currentMinValue = sorted[index];
        }
        index++;
        if (index === array.length) {
          sorted.splice(currentMinIndex, 1);
          sorted.splice(nextInsertIndex, 0, currentMinValue);
          nextInsertIndex++;
          if (nextInsertIndex === index - 1) {
            return {
              value: {
                array: sorted,
                count
              },
              done: true
            };
          }
          currentMinIndex = nextInsertIndex;
          currentMinValue = sorted[currentMinIndex];
          index = currentMinIndex + 1;
        }
      }
    }
  };
  return iterator;
}
