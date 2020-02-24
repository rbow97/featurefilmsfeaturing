// Compare arrays for the compareCredits function
export const compareArrays = (array1, array2) => {
  //We need a better version
  const outputArray = [];

  // Sort the arrays so we have k sorted arrays
  // console.log(array1);
  // console.log(array2);
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i].id === array2[j].id && array1[i].name === array2[j].name) {
        outputArray.push(array1[i]);
      } else {
        if (
          array1[i].id === array2[j].id &&
          array1[i].original_title === array2[j].original_title
        ) {
          outputArray.push(array1[i]);
        }
      }
    }
  }

  return outputArray;
};

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const percentage = num => {
  return (num / 10) * 100;
};

export const removeUnwantedMedia = result => {
  if (
    result.id === 1220 ||
    result.id === 1667 ||
    result.id === 63498 ||
    result.id === 27023 ||
    result.id === 1489 ||
    result.id === 562 ||
    result.id === 1667 ||
    result.id === 1709 ||
    result.id === 3167 ||
    result.id === 4573 ||
    result.id === 2224 ||
    result.id === 2518 ||
    result.id === 66488 ||
    result.id === 60971 ||
    result.original_name === "Live with Regis and Kathie Lee"
  ) {
    return;
  } else return result;
};

export const mergeArrays = (...arrays) => {
  let jointArray = [];

  arrays.forEach(array => {
    jointArray = [...jointArray, ...array];
  });

  let map = {};
  let uniqueArray;
  for (let i = 0; i < jointArray.length; i++) {
    if (map[jointArray[i].id]) {
      continue;
    } else {
      map[jointArray[i].id] = jointArray[i];
    }
  }

  uniqueArray = Array.from(Object.values(map));

  return uniqueArray;
};
