function filter(arr, helper){
  var res = [];
  for( var i = 0; i < arr.length; i++) {
    if (helper(arr[i], i ,arr)) {
       res.push(arr[i]);
    }
  }
  return res;
}

function reject(arr, helper){
    var res = [];
    for( var i = 0; i < arr.length; i++) {
      if (!helper(arr[i], i ,arr)) {
         res.push(arr[i]);
      }
    }
    return res;
  }



function partition(arr, helper){
  return[filter(arr,helper), reject(arr, helper)];
}