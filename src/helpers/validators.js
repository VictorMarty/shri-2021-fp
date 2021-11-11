/**
 * https://github.com/MoonW1nd/fp-live-coding
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {add, apply, compose, prop, anyPass, allPass, curry, equals, tap, tryCatch, applySpec, reduce, gte, lte, filter, eqProps,} from "ramda"

// try\catch
// const createSafeFunction = (fn) => tryCatch(fn, log)

// const printToConsole = console.log
// const log = (color, type, message) => printToConsole("c" + `[${type}]: ${message}`, "color:" + color + ";font-weight:bold;");

// const curriedLog = curry(log)
// const logBlackColor = curriedLog("black")
// const logRedColor = curriedLog("red")
// const logError = curriedLog("ERR")
// const logInfoMessage = compose(logInfo, getMessage);
// const logInfo = curriedLog("INF")

// const logFalse = logError("Not Cool")
// const logErrorMessage = compose(logError, getMessage);
// Проверка условий

// Гетеры
const getMessage = prop('message')
const count = prop('length')
const getColor = prop
const starColor = getColor('star')
const squareColor = getColor('square')
const triangleColor = getColor('triangle')
const circleColor = getColor('circle')

const greenColor = prop("green")
const blueColor = prop('blue')
const whiteColor = prop('white')
const redColor = prop('red')
// проверка цвета
const isWhite = equals('white')
const isGreen = equals('green')
const isRed = equals('red')
const isBlue = equals('blue')

// Фигура с цветом

const redStar = compose(isRed, starColor)
const greenSquare = compose(isGreen, squareColor)
const whiteTriangle = compose(isWhite, triangleColor)
const whiteCircle = compose(isWhite, circleColor)


const minimum = curry(lte)
const curryEquals =curry(equals)
const countGreenFigures = compose(count, filter(isGreen), Object.values)
const countRedFigures = compose(count, filter(isRed), Object.values)
const countBlueFigures = compose(count, filter(isBlue), Object.values)
const countWhiteFigures = compose(count, filter(isWhite), Object.values)
const countColors = applySpec({
    blue: countBlueFigures,
    red: countRedFigures,
    green: countGreenFigures,
    white: countWhiteFigures
})

const countRedAndBlue = compose(Object.values,applySpec([countRedFigures,countBlueFigures]))
const equalsRed = equals(countRedFigures)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([redStar,greenSquare,whiteTriangle,whiteCircle])
// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(minimum(2),countGreenFigures)
// 3. Количество красных фигур равно кол-ву синих.
// export const validateFieldN3 = allPass([equals(countRedFigures, countBlueFigures)])
export const validateFieldN3 = compose(
    console.log,
    curryEquals(redColor, blueColor),
    countColors
)
// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;
