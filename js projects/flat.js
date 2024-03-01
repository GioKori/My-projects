function flat(arr, dept) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (dept === 0) {
    return arr;
  }
  if (dept === undefined){
    dept = 1;
  }
  return arr.reduce((acc, cur) => {
    return acc.concat(flat(cur,dept -1));
  }, []);
}
