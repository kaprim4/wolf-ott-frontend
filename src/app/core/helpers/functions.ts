export function isNumeric(s: any) {
    if (typeof s !== 'string') {
        return false;
    }
    //We return false if the string is ""
    return !isNaN(Number(s)) && !isNaN(parseFloat(s));
}
