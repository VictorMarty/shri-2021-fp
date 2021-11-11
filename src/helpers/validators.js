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


import {not, values, apply, compose, prop, allPass, curry, equals, applySpec, lte, filter, converge, max,} from "ramda"

// Гетеры
const count = prop('length')
const getColor = prop
const starColor = getColor('star')
const squareColor = getColor('square')
const triangleColor = getColor('triangle')
const circleColor = getColor('circle')

const isWhite = equals('white')
const isGreen = equals('green')
const isRed = equals('red')
const isBlue = equals('blue')
const isOrange = equals('orange')

const notWhite = compose(not, isWhite)

const redStar = compose(isRed, starColor)
const greenTriangle = compose(isGreen, triangleColor)
const greenSquare = compose(isGreen, squareColor)
const whiteStar = compose(isWhite, starColor)
const orangeSquare = compose(isOrange, squareColor)
const blueCircle = compose(isBlue, circleColor)

const notRedStar = compose(not, redStar)
const notWhiteStar = compose(not, whiteStar)

const notWhiteFigures = filter(notWhite)

const countGreenFigures = compose(count, filter(isGreen), Object.values)
const countRedFigures = compose(count, filter(isRed), Object.values)
const countBlueFigures = compose(count, filter(isBlue), Object.values)
const countWhiteFigures = compose(count, filter(isWhite), Object.values)
const countOrangeFigures = compose(count, filter(isOrange), Object.values)
const countColors = applySpec({
    blue: countBlueFigures,
    red: countRedFigures,
    green: countGreenFigures,
    white: countWhiteFigures,
    orange: countOrangeFigures
})

const twoGreenFigures = compose(equals(2),countGreenFigures)
const oneRedFigure = compose(equals(1), countRedFigures)
const twoWhiteFigures = compose(equals(2),countWhiteFigures)

const minimum = curry(lte)
const equally = converge(equals)

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([redStar,greenSquare,twoWhiteFigures])

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(minimum(2),countGreenFigures)

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = equally([countRedFigures, countBlueFigures])

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([redStar,orangeSquare,blueCircle])

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
    minimum(3),
    apply(max),
    values,
    countColors,
    notWhiteFigures,
)

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([twoGreenFigures,greenTriangle,oneRedFigure])

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(equals(4),countOrangeFigures)

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([notRedStar,notWhiteStar])

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(equals(4),countGreenFigures)

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = equally([triangleColor, squareColor])
