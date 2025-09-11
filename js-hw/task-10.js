/*
    3. Простий Promise:
    Є число x. 
    Якщо воно більше 10 — Promise має повернути resolve("Більше 10").
    Якщо менше або дорівнює 10 — reject("Менше або дорівнює 10").
*/

const x = 12;

const checkNumber = new Promise((resolve, reject) => {
    // ...
});

checkNumber
    .then((message) => {
        console.log("Успіх:", message);
    })
    .catch((error) => {
        console.log("Помилка:", error);
    }); 
