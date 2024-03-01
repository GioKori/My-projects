// Create two functions that will work like _.debounce from lodash.

// debounce: don't worry about the options.
// opDebounce: implement the leading options.

function debounce(func, delay) {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

function opDebounce(func, delay, options) {
  var timer = null,
    first = true,
    leading;
  if (typeof options === "object") {
    leading = !!options.leading;
  }
  return function () {
    let context = this,
    args = arguments;
    if (first && leading) {
        func.apply(context, args) ;
        first = false;
    }
    if (timer) {
        clearTimeout(timer);
    }
    timer = setTimeout(function (){
        func.apply(context, args);
    }, delay);
  };
}
