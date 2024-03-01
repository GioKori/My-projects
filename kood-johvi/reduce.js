function fold(arr, func, acc){
    for (var i = 0; i < arr.length; i++){
        acc = func(acc, arr[i], i, arr);
    }
    return acc;
}

function foldRight(arr, func, acc){
    for (var i = arr.length -1; i >= 0; i--){
        acc = func(acc, arr[i],i, arr);
    }
    return acc;
}


function reduce(arr, func){
    let acc= arr[0];
    for( var i = 1; i < arr.length; i++){
        acc = func(acc, arr[i], i , arr);
    }
    return acc;
}

function reduceRight(arr, f) {
    let acc = arr[arr.length - 1];
    for (var i = arr.length - 2; i >= 0; i--) {
        acc = f(acc, arr[i], i, arr);
    }
    return acc;
}