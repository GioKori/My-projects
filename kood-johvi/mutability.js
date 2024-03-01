//Create three copies of the person object named clone1, clone2 and samePerson.

//Increase the age of person by one, and set its country to 'FR'.
//You must find a way to keep the original values of clone1 and clone2. The values of samePerson should change when person is changed.

const clone1 = Object.assign({}, person);
const clone2 = Object.assign({}, person);
const samePerson = person;

person.age++;
person.country = 'FR';

console.log('person:', person);
console.log('clone1:', clone1);
console.log('clone2:', clone2);
console.log('samePerson:', samePerson);