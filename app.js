var express = require("express");
var app = express();
const router = require("./config/router");
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');


app.use(express.urlencoded({extended: false}));

app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/app/views/diretorio_layouts',
    partialsDir: __dirname + '/app/views/partials',
    defaultLayout: 'main',
    helpers: require(__dirname + '/app/views/helpers/helpers.js')
}));

app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');

app.use(sass({
    src: __dirname + '/public/scss',
    dest: __dirname + '/public/css',
    debug: true,

    prefix: '/css'
}));

app.use('/img', [
    express.static(__dirname + '/public/img'),
    express.static(__dirname + '/node_modules/admin-lte/dist/img'),

]);

app.use('/webfonts', [
    express.static(__dirname + '/public/webfonts')
]);

app.use('/css', [
    express.static(__dirname + '/public/css'),
    
]);

app.use('/js', [
    express.static(__dirname + '/node_modules/jquery/dist'),
    express.static(__dirname + '/node_modules/jquery-ui-dist'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js'),
    express.static(__dirname + '/node_modules/@fortawesome/'),
  
    express.static(__dirname + '/node_modules/admin-lte/dist/js'),
    express.static(__dirname + '/node_modules'),
    express.static(__dirname + '/node_modules/toastr'),
    express.static(__dirname + '/node_modules/moment/min'),
    express.static(__dirname + '/node_modules/@fullcalendar'),
    express.static(__dirname + '/node_modules/daterangepicker'),
    express.static(__dirname + '/node_modules/tempusdominus-bootstrap-4/build/js'),
    express.static(__dirname + '/public/js')
]);

app.use(router);

app.listen(3000, function () {
    console.log("Express app iniciada na porta 3000.");
});

/*

npx sequelize model:create --underscored --name reserva --attributes "dataReserva:date,id_sala:integer,
id_solicitante:integer,atividade:string,tipo:string,dataInicio:dateonly,dataTermino:dateonly,horaInicio:time,horaTermino:time"

npx sequelize model:create --underscored --name sala2 --attributes "nome:string,numero:integer,localizacao:string"

*/