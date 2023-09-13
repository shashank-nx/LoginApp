export const EmailValidator = (value: string) => {
    var validRegex = /^([!#-'*+/-9=?A-Z^-~-]{2,}(\.[!#-'*+/-9=?A-Z^-~-]{2,})*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~])+\")@([!#-'*+/-9=?A-Z^-~-]{2,}(\.[!#-'*+/-9=?A-Z^-~-]{2,})*|\[[\t -Z^-~]*])$/;
    const isValid = validRegex.test(value);
    return isValid;
}