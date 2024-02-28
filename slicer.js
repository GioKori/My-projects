function slice(str, start, end) {
  if (start < 0) {
    start = str.length + start;
  }
  if (end === undefined || end > str.length) {
    end = str.length;
  }
  if (end < 0) {
    end = str.length + end;
  }

  if (typeof str === "string") {
    let result = "";
    for (let i = start; i < end; i++) {
      result += str[i];
    }
    return result;
  }

  let result = [];
  for (let i = start; i < end; i++) {
    result.push(str[i]);
  }
  return result;
}
