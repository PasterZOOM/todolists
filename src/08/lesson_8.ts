// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    // console.log(nums)
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let summ = 0
    for (let i = 0; i < nums.length; i++) {
        nums[i] && (summ = summ + nums[i])
    }
    return summ
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    if ((a + b) < c && (a + c) < b && (b + c) < a) {
        return '00'
    }
    if (a === b && a === c) {
        return '10'
    }
    if (a === b || a === c || b === c) {
        return '01'
    }
    return '11'
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    //...здесь пишем код.
    let sum = 0
    let arr = number.toString().split('')
    for (let i = 0; i < arr.length; i++) {
        sum += +arr[i]
    }
    // В return стоит "заглушка", чтоб typescript не ругался
    return sum
}

// export function getSum(number: number): number {
//     if(number === 0) {
//         return number
//     } else {
//         return number % 10 + getSum(Math.trunc(number / 10))
//     }
// }


// 4. Функция isEvenIndexSumGreater принимает параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let sum1 = 0
    let sum2 = 0
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 !== 0) {
            sum1 += +arr[i]
        }
        if (i % 2 === 0) {
            sum2 += +arr[i]
        }
    }
    return sum1 < sum2;
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, которые являются элементами исходного массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return array.filter(n => n > 0 && n % 1 === 0).map(n => n ** 2)
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let sum = 0
    for (let i = 1; i < N + 1; i++) {
        sum += i
    }
    return sum
    //return N * (N + 1) / 2
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let sum = amountOfMoney
    let a = []
    for (let i = sum; i >= 1000; i -= 1000) {
        a.push(1000)
        sum -= 1000
    }
    for (let i = sum; i >= 500; i -= 500) {
        a.push(500)
        sum -= 500
    }
    for (let i = sum; i >= 100; i -= 100) {
        a.push(100)
        sum -= 100
    }
    for (let i = sum; i >= 50; i -= 50) {
        a.push(50)
        sum -= 50
    }
    for (let i = sum; i >= 20; i -= 20) {
        a.push(20)
        sum -= 20
    }
    for (let i = sum; i >= 10; i -= 10) {
        a.push(10)
        sum -= 10
    }
    for (let i = sum; i >= 5; i -= 5) {
        a.push(5)
        sum -= 5
    }
    for (let i = sum; i >= 2; i -= 2) {
        a.push(2)
        sum -= 2
    }
    for (let i = sum; i >= 0; i -= 1) {
        a.push(1)
        sum -= 1
    }
    return a
}

// export function getBanknoteList(amountOfMoney: number): Array<number> {
//
//     const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1];
//     const sum = [];
//
//     for (let i = 0; i < banknotes.length; i++) {
//
//         if (amountOfMoney >= banknotes[i]) {
//             sum.push(banknotes[i]);
//             amountOfMoney -= banknotes[i];
//             i = i - 1;
//         } else if (!amountOfMoney) {
//             break;
//         }
//
//     }
//
//     return sum;
// }
