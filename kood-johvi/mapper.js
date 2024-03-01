function map(arr, func) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(func(arr[i], i, arr));
  }
  return result;
}

function flatMap(arr, action) {
  return arr.reduce((acc, val, i, arr) => acc.concat(action(val, i, arr)), []);
}
