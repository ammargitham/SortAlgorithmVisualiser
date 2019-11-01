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
