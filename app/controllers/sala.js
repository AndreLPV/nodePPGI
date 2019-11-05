var models = require('../models/index');
var Sala = models.j17_reservas_salas;
var Reserva = models.j17_reservas;

var reservaMenu = true;

const index = async (req, res) => {
    var salas = await Sala.findAll(/*{
        include: [{ model: Reserva, as: 'reservas' }]
    }*/);
  

    res.render('sala/index', { salas ,active:{reservaMenu,salas:true}});
};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('sala/create');
    } else {
        if (!req.body.numero) req.body.numero = null
        try {
            await Sala.create(req.body);
            res.redirect('/sala');
        } catch (e) {
            res.render('sala/create', {
                errors: e.errors,
                sala: req.body,
            });
        }
    }
};

const read = async (req, res) => {
    var sala = await Sala.findByPk(req.params.id)
    console.log(sala)
    res.render('sala/read', { sala });
};

const update = async (req, res) => {
    if (req.route.methods.get) {
        var sala = await Sala.findByPk(req.params.id);
        res.render('sala/update', { sala });
    } else {
        if (!req.body.numero) req.body.numero = null
        try {

            await Sala.update(req.body, { where: { id: req.body.id } });
            res.redirect('/sala');
        } catch (e) {

            res.render('sala/update', {
                sala: req.body,
                errors: e.errors,
            });
        }
    };
}
const remove = async (req, res) => {
    if (req.route.methods.get) {

        var sala = await Sala.findByPk(req.params.id);
        res.render('sala/remove', { sala });
    } else {

        await Sala.destroy({ where: { id: req.body.id } });
        res.redirect('/sala');

    }
};

module.exports = { index, read, create, update, remove }