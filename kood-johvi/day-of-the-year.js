function dayOfTheYear(date){
  let day =1;
  while(!isFirstDate(date)) {
    date.setDate(date.getDate() - 1);
    day++;
  }
  return day;

}

function isFirstDate(date){
    return date.getDate() === 1 && date.getMonth() === 0;
}