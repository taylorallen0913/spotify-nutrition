// Gets the number of occurances of each element in a string array
export const getOccuranceMap = (arr: string[]) => {
  let occuranceMap: any = {};
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (occuranceMap[el] == null) occuranceMap[el] = 1;
    else occuranceMap[el]++;
  }
  return occuranceMap;
};

// Gets the most occuring element in a string array
export const getMostOccuringElement = (arr: string[]): string => {
  let occuranceMap: any = {};
  let maxEl = arr[0],
    maxCount = 1;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (occuranceMap[el] == null) occuranceMap[el] = 1;
    else occuranceMap[el]++;
    if (occuranceMap[el] > maxCount) {
      maxEl = el;
      maxCount = occuranceMap[el];
    }
  }
  return maxEl;
};
