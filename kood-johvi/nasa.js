function nasa(n) {
    var result = "";
    for(var i =1; i <= n; i++){
        if(i % 3 === 0 && i % 5 === 0) {
            result = result + "NASA";
        } else if (i % 3 === 0) {
            result = result + "NA";
        } else if ( i %5 === 0) {
            result = result + "SA";
        } else {
            result = result + i.toString();
        }
        if (i != n) {
            result = result + " ";
        }
    }
    return result;
}