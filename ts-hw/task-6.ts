/*
    Обов'язкові та необов'язкові поля:
    Є інтерфейс User з ключами:
    name (string), age (number), email (string)
    
    Задача:
    a) Створити тип FullUser, де всі поля обов'язкові.
    b) Створити тип PartialUser, де всі поля необов'язкові.
*/

interface User {
    name: string;
    age: number;
    email: string;
}
