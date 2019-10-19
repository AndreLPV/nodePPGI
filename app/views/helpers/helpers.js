const toLower = function (value) {
    return value.toLowerCase();
}
const toUpper = function (value) {
    return value.toUpperCase();
}
const eq = function (val1, val2) {
    return val1 === val2;
}

const section = function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
}

const inc = function (value) {
    return parseInt(value) + 1;
}

const showError = function (errors, field) {
    if (errors) {
        const index = errors.findIndex(erro => erro.path == field)
        if (index != -1) return errors[index].message
    }
    return "";
}

const hasError = function (errors, field) {
    if (errors) {
        const index = errors.findIndex(erro => erro.path == field)
        if (index != -1) return "is-invalid";
    }
    return "";

}

const jsoner = function(obj) {
    return JSON.stringify(obj)
 }
module.exports = { toLower, toUpper, eq, inc, section, hasError, showError ,jsoner};