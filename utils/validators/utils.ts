export {}

const isEmptyRemoveWhiteSpace = (str: string) => str.trim() === '';
const isEmptyAllowWhiteSpace = (str: string) => str === '';

module.exports = {
    isEmptyRemoveWhiteSpace,
    isEmptyAllowWhiteSpace
}