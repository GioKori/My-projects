function triangle(char, num) {
  let str = "";
  for (var i = 1; i <= num; i++) {
    str = str + char.repeat(i) + "\n";
  }
  return str.slice(0, -1);
}


//const result = triangle('*', 5);
//console.log(result);
