function mult2(n) {
  return function (y) {
    return n * y;
  };
}

function add3(n) {
  return function (y) {
    return function (z) {
      return n + y + z;
    };
  };
}

function sub4(n) {
  return function (y) {
    return function (z) {
      return function (m) {
        return n - y - z - m;
      };
    };
  };
}
