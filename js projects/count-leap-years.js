function countLeapYears(date){
    let year = date.getFullYear() -1;
    return Math.floor(year / 4)- Math.floor(year / 100) + Math.floor(year / 400);
}