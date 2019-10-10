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

app.use('/css', [
    express.static(__dirname + '/public/css'),
]);

app.use('/js', [
    express.static(__dirname + '/node_modules/jquery/dist'),
    express.static(__dirname + '/node_modules/popper.js/dist/umd'),
    express.static(__dirname + '/node_modules/bootstrap/dist/js'),
    express.static(__dirname + '/node_modules/admin-lte/plugins'),
    express.static(__dirname + '/node_modules/admin-lte/dist/js'),
    express.static(__dirname + '/public/js')
]);

app.use(router);





app.listen(3000, function () {
    console.log("Express app iniciada na porta 3000.");
});
