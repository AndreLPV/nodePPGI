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
module.exports = { toLower, toUpper, eq, section };