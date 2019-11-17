var models = require('../models/index');
const Op = require('../models').Sequelize.Op;
var moment = require('moment');

var Reserva = models.reserva;
var Sala = models.sala;
var User = models.usuario;

var reservaMenu = true;

const index = async (req, res) => {
    var salas = await Sala.findAll({

        include: [{
            model: Reserva,
            attributes: ['dataInicio']
        }]
    });
    res.render('reserva/index', { salas, active: { reservaMenu, reservas: true } });
};

const createLote = async (req, res) => {
    if (req.route.methods.get) {
        var salas = await Sala.findAll();
        res.render('reserva/createLote', { salas, active: { reservaMenu } });
    } else {

        if (!req.body.dias) {
            var salas = await Sala.findAll();
            res.render('reserva/createLote', {
                msg: "Marque pelo menos um dia da semana",
                reserva: req.body,
                salas,
                active: { reservaMenu }
            });
        } else if (!req.body.id_sala) {
            var salas = await Sala.findAll();
            res.render('reserva/createLote', {
                msg: "Escolha uma sala",
                reserva: req.body,
                salas,
                active: { reservaMenu }
            });
        } else {
            if (!Array.isArray(req.body.dias)) req.body.dias = [req.body.dias];

            var arr = [];
            req.body.dias.forEach((dia) => {
                let start = moment(req.body.dataInicio);
                let end = moment(req.body.dataTermino);
                let tmp = start.clone().day(dia);
                if (tmp.isSameOrAfter(start)) {
                    const data = tmp.format('YYYY-MM-DD')
                    arr.push({
                        dataReserva: req.body.dataReserva,
                        id_sala: req.body.id_sala,
                        id_solicitante: 1,
                        atividade: req.body.atividade,
                        tipo: req.body.tipo,
                        dataInicio: data,
                        dataTermino: data,
                        horaInicio: req.body.horaInicio,
                        horaTermino: req.body.horaTermino,
                    });
                }
                tmp.add(7, 'd');
                while (moment(tmp).isSameOrBefore(moment(end))) {
                    const data = tmp.format('YYYY-MM-DD')
                    arr.push({
                        dataReserva: req.body.dataReserva,
                        id_sala: req.body.id_sala,
                        id_solicitante: 1,
                        atividade: req.body.atividade,
                        tipo: req.body.tipo,
                        dataInicio: data,
                        dataTermino: data,
                        horaInicio: req.body.horaInicio,
                        horaTermino: req.body.horaTermino,
                    });
                    tmp.add(7, 'd');
                }
            })
            try {
                await Reserva.bulkCreate(arr, { validate: true });
                res.redirect('/reserva');
            } catch (e) {
                var salas = await Sala.findAll();
                res.render('reserva/createLote', {
                    msg: "Um ou mais campos não preenchidos",
                    reserva: req.body,
                    salas,
                    active: { reservaMenu }
                });
            }
        }
    }
};

const read = async (req, res) => {
    var reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Sala, as: 'sala' }, { model: User, as: 'usuario' }]
    })
    console.log(reserva)
    reserva.diaHoraReserva = moment(reserva.dataReserva).format("DD-MM-YYYY HH:mm:ss");
    res.render('reserva/read', { reserva, active: { reservaMenu } });
};


const update = async (req, res) => {
    if (req.route.methods.get) {
        var reserva = await Reserva.findByPk(req.params.id, {
            include: [{ model: Sala, as: 'sala' }]
        });
        res.render('reserva/update', { reserva, active: { reservaMenu } });
    } else {
        try {
            await Reserva.update({
                atividade: req.body.atividade,
                tipo: req.body.tipo,
                horaInicio: req.body.horaInicio,
                horaTermino: req.body.horaTermino
            }, { where: { id: req.body.id } });
            res.redirect('/reserva/read/' + req.body.id);
        } catch (e) {
            res.render('reserva/update', {
                reserva: req.body,
                errors: e.errors,
                active: { reservaMenu }
            });
        }
    };
}


const remove = async (req, res) => {
    if (req.route.methods.get) {
        var reserva = await Reserva.findByPk(req.params.id, {
            include: [{ model: Sala, as: 'sala' }]
        });
        res.render('reserva/remove', { reserva, active: { reservaMenu } });
    } else {
        await Reserva.destroy({ where: { id: req.body.id } });
        res.redirect('/reserva');
    }
};


const listagem = async (req, res) => {
    if (req.params.id) {
        var reservas = await Reserva.findAll({
            where: {
                dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                id_sala: req.params.id
            },
            include: [{ model: Sala, as: 'sala' }]
        });
        var sala = await Sala.findByPk(req.params.id);

    } else {

        var reservas = await Reserva.findAll({
            where: {
                dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") }
            },
            include: [{ model: Sala, as: 'sala' }]
        });
    }
    res.render('reserva/listagem', { sala, reservas, active: { reservaMenu } });
}

const calendario = async (req, res) => {
    if (req.route.methods.get) {
        var salas = await Sala.findAll();
        var sala = await Sala.findByPk(req.params.id);

        var reservas = await Reserva.findAll({
            where: {
                // Descomentar a linha abaixo faz com que as reservas mostradas no calendário sejam apenas do dia atual pra frente.
                // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                id_sala: req.params.id
            },
        });
        res.render('reserva/calendario', { reservas, salas, sala, active: { reservaMenu } });
    } else {
        try {
            req.body.id_solicitante = 1;
            await Reserva.create(req.body);
            res.redirect('/reserva');
        } catch (e) {
            console.log(req.body.sala);
            var salas = await Sala.findAll();
            var sala = await Sala.findByPk(req.body.id_sala);
            var reservas = await Reserva.findAll({
                where: {
                    // Descomentar a linha abaixo faz com que as reservas mostradas no calendário sejam apenas do dia atual pra frente.
                    // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                    id_sala: req.body.id_sala
                },
            });

            res.render('reserva/calendario', {
                errors: e.errors,
                reserva: req.body,
                sala,
                salas,
                reservas,
                active: { reservaMenu }
            });
        }
    }
}

module.exports = { index, read, update, remove, listagem, calendario, createLote }