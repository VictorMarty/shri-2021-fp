/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { round, toNumber, toString } from 'lodash';
import { __, assoc, allPass, compose, gt, ifElse, lt, prop, tap, andThen, otherwise, modulo, concat } from 'ramda';
import Api from '../tools/api';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    // props
    const getLength = prop('length')
    const getResult = prop('result')
    // logs
    const logErrorValidation = ()  => handleError("ValidationError")
    const logErrorPromise = (e) => handleError(e)
    const logSuccessPromise = (message) => handleSuccess(message)
    // Validators
    const lengthLess10 = compose(gt(10), getLength)
    const isPositiveNumber = compose(lt(0), Number)
    const lengthMore2 = compose(lt(2), getLength)
    const isValid = allPass([
        lengthLess10,
        isPositiveNumber,
        lengthMore2
    ])

    // operations
    const toSquare = (n) => n**2
    const mod3 = modulo(__, 3);

    const apiAnimals = api.get(__,{})
    const createUrlAnimals = concat("https://animals.tech/")

    const logAnimal = compose(logSuccessPromise,getResult)

    const getAnimals = compose(
        otherwise(logErrorPromise),
        andThen(logAnimal),
        apiAnimals,
        createUrlAnimals,
        toString
    )

    const useBinaryValue = compose(
        getAnimals,
        tap(writeLog),
        mod3,
        tap(writeLog),
        toSquare,
        tap(writeLog),
        getLength,
        tap(writeLog),
        getResult
    )

    const apiNumber = api.get("https://api.tech/numbers/base")
    const setParams = assoc("number", __, { from: "10", to: "2" })
    const getBinaryValue = compose(
        apiNumber,
        setParams,
        toString
    )

    const getIntegerValue = compose(
        tap(writeLog),
        round,
        toNumber
    )

    const useValue = compose(
        otherwise(logErrorPromise),
        andThen(useBinaryValue),
        getBinaryValue,
        getIntegerValue,
    )

    const validate = ifElse(
        isValid,
        useValue,
        logErrorValidation
    )

    const process = compose(validate, tap(writeLog))

    process(value)
};

export default processSequence;