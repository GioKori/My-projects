function repeat(string, number) {
    if(number <= 0) {
        return '';
    } else {
        return string + repeat(string, number -1 );
    }
}