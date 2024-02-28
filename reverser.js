function reverse(input) {
  if (typeof input === "string") {
    let result = "";
    for(let i = input.length -1; i >= 0; i--) {
        result += input[i];
    }
    return result;
  } else if (Array.isArray(input)) {
    let result = [];
    for(let i = input.length -1; i >= 0 ; i--) {
        result.push(input[i]);
    }
    return result;
  }
}