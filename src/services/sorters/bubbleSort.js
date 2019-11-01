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
