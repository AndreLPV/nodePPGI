var models = require('../models/index');
const Op = require('../models').Sequelize.Op;
var moment = require('moment');

var Reserva = models.j17_reservas;
var Sala = models.j17_reservas_salas;


const index = async (req, res) => {
    var salas = await Sala.findAll();
    res.render('reserva/index', { salas });
};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('reserva/create');
    } else {
        try {
            await Reserva.create(req.body);
            res.redirect('/reserva');
        } catch (e) {
            console.log(req.body);
            console.log(e)
            var salas = await Sala.findAll();
            var reservas = await Reserva.findAll({
                where: {
                    // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                    sala: req.body.sala
                },
            });
            res.render('reserva/calendario', {
                errors: e.errors,
                reserva: req.body,
                sala: req.body.sala,
                salas,
                reservas
            });
        }
    }
};

const read = async (req, res) => {
    var reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Sala, as: 'salao' }]
    })
    reserva.diaHoraReserva = moment(reserva.dataReserva).format("DD-MM-YYYY HH:mm:ss");
    res.render('reserva/read', { reserva });
};

const update = async (req, res) => {
    if (req.route.methods.get) {
        var reserva = await Reserva.findByPk(req.params.id);
        res.render('reserva/update', { reserva });
    } else {
        if (!req.body.numero) req.body.numero = null
        try {

            await Reserva.update(req.body, { where: { id: req.body.id } });
            res.redirect('/reserva');
        } catch (e) {

            res.render('reserva/update', {
                reserva: req.body,
                errors: e.errors,
            });
        }
    };
}
const remove = async (req, res) => {
    if (req.route.methods.get) {

        var reserva = await Reserva.findByPk(req.params.id);
        res.render('reserva/remove', { reserva });
    } else {

        await reserva.destroy({ where: { id: req.body.id } });
        res.redirect('/reserva');

    }
};

const listagem = async (req, res) => {
    if (req.params.id) {
        var reservas = await Reserva.findAll({
            where: {
                dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                sala: req.params.id
            },
            include: [{ model: Sala, as: 'salao' }]
        });
    } else {
        var reservas = await Reserva.findAll({
            where: {
                dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") }
            },
            include: [{ model: Sala, as: 'salao' }]
        });
    }


    res.render('reserva/listagem', { reservas });
}

const calendario = async (req, res) => {
    var salas = await Sala.findAll();
    var reservas = await Reserva.findAll({
        where: {
            // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
            sala: req.params.id
        },
    });


    res.render('reserva/calendario', { reservas, salas, sala: req.params.id });
}




module.exports = { index, read, create, update, remove, listagem, calendario }