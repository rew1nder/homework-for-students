/*
    Інвертувати рядок:
    "JavaScript" → "tpircSavaJ".
*/

const word = "JavaScript";

//SOLUTION
const reversed = word.split('').reverse().join('');
console.log(reversed);