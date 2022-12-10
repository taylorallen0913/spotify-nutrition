export const getOccuranceMap = (arr: string[]) => {
  let modeMap: any = {};
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
  }
  return modeMap;
};

export const getMostOccuringElement = (arr: string[]): string => {
  let modeMap: any = {};
  let maxEl = arr[0],
    maxCount = 1;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
};
