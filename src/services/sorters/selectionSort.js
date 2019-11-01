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
