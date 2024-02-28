function isValid(date) {
  if (isNaN(date)) return false;
  if (date instanceof Date) {
    return !isNaN(date.valueOf());
  }
  return typeof date === 'number' && Number.isInteger(date) && date > -8_640_000_000_000_000 && date < 8_640_000_000_000_000
  }


function isAfter(date1, date2){
 if (date1 > date2){
    return true;
 }
}

function isBefore(date1,date2){
if (date1 < date2){
    return true;
}
}

function isFuture(date){
  return isValid(date) && isAfter(date, new Date());
}

function isPast(date){
    return isValid(date) && isBefore(date, new Date());
}

const dates = [
    new Date(),
    new Date('2016-01-01'),
    new Date(''),
    new Date(1488370835081),
    new Date(NaN),
    '2016-01-01',
    '',
    1488370835081,
    NaN,
    2.5
]
dates.forEach(d => console.log(d, '\t\t', isValid(d)));