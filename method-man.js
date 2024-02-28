// words: that takes a string, splits it by spaces, and returns an array of those substrings.
// sentence: that takes an array of strings, and joins them with spaces to return a single string.
// yell: that takes a string and returns it in upper case.
// whisper: that takes a string and returns it in lower case, surrounded by *.
// capitalize: that takes a string and transforms it so that the first character is upper case, and the subsequent characters are lower case.


function words(str) {
    return str.split(' ');
}

function sentence(arr) {
    return arr.join(' ');
}

function yell(str){
    return str.toUpperCase();
}

function whisper(str) {
    return `*${str.toLowerCase()}*`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}