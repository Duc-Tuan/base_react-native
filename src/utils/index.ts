/* eslint-disable prettier/prettier */
export function hexToRgba(hex: string, opacity: number): string {
  hex = hex.replace("#", "");

  if (hex.length !== 3 && hex.length !== 6) {
    return "";
  }

  let r: number, g: number, b: number;
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const formatCurrency = (
  num: number,
  suffixes: string = "đ",
  positionSuffixes: string = "right",
  separate: string = ",",
  configNull?: {
    format?: string;
    toFixed?: number;
  }
) => {
  if (num) {
    const s = Number(num).toFixed(configNull?.toFixed);
    const regex = /\B(?=(\d{3})+(?!\d))/g;
    return positionSuffixes === "right"
      ? s.replace(regex, separate) + suffixes
      : suffixes + s.replace(regex, separate);
  }
  return !configNull ? 0 : configNull.format;
};

export const chunkArray = (myArray: any[], chunk_size: number) => {
  var index = 0;
  var arrayLength = myArray?.length;
  var tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    let myChunk = myArray?.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
};