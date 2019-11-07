var moment = require('moment');

const toLower = function (value) {
    return value.toLowerCase();
}
const toUpper = function (value) {
    return value.toUpperCase();
}
const eq = function (val1, val2) {
    return val1 === val2;
}

// Esse section é pra organizar melhor as dependência das views.
// Pra não colocar tudo dentro lá do layout main, uso isso aqui 
// pra chamar estilos/scripts especificos que provavelmente
// vão ser chamados uma única vez em uma view especifica

const section = function (name, options) {
    if (!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
}

// Uso isso aqui na tabela das salas pra ela não começar do zero naquela coluna da esquerda
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

const isActive = function (field) {
    if (field) return "active";
    return "";
}


const isSelected = function (val1,val2) {
    if (val1 == val2) return "selected";
    else return "";
}

const openMenu = function (field) {
    if (field) return "menu-open";
    return "";
}

const ddmmYYYY = function(data){
    console.log(data)
    return moment(data).format('DD-MM-YYYY');
}

const contarAtivos = function(array){
    return  array.filter((obj) => moment(obj.dataInicio).isSameOrAfter(moment().format("YYYY-MM-DD"))).length;

}


// Isso aqui é pra pegar os dados do handlebars no script, varri a internet procurando
// uma solução oficial mas não achei, esse aqui foi o melhor jeito.
// tem que retornar false, se retornar null dependendo do que
// é passado pra cá pode bugar o handlebars, dando erro, travando a página e por ai vai. 
const jsoner = function (obj) {
    if (obj) return JSON.stringify(obj);
    return false;
}
module.exports = { contarAtivos, toLower, toUpper, eq, inc, section, hasError, showError, jsoner, isActive,isSelected,openMenu,ddmmYYYY };