var models = require('../models/index');
const Op = require('../models').Sequelize.Op;
var moment = require('moment');

var Reserva = models.j17_reservas;
var Sala = models.j17_reservas_salas;

var reservaMenu = true;

const index = async (req, res) => {
    var salas = await Sala.findAll();
    res.render('reserva/index', { salas, active: { reservaMenu, reservas: true } });
};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('reserva/create', { active: { reservaMenu } });
    } else {
        try {
            await Reserva.create(req.body);
            res.redirect('/reserva');
        } catch (e) {
            //console.log(req.body);
            console.log(e.errors)
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
                reservas,
                active: { reservaMenu }
            });
        }
    }
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
        } else {
            try {
                var arr = [];
                if (Array.isArray(req.body.dias)) {
                    req.body.dias.forEach(async (dia) => {
                        let start = moment(req.body.dataInicio);
                        let end = moment(req.body.dataTermino);
                        let tmp = start.clone().day(dia);
                        if (tmp.isSameOrAfter(start)) {
                            const data = tmp.format('YYYY-MM-DD')
                            await Reserva.create({
                                dataReserva: req.body.dataReserva,
                                sala: req.body.sala,
                                idSolicitante: 1250,
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
                            //arr.push(tmp.format('YYYY-MM-DD'));
                            const data = tmp.format('YYYY-MM-DD')
                            await Reserva.create({
                                dataReserva: req.body.dataReserva,
                                sala: req.body.sala,
                                idSolicitante: 1250,
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
                } else {
                    let start = moment(req.body.dataInicio);
                    let end = moment(req.body.dataTermino);
                    let tmp = start.clone().day(req.body.dias);
                    if (tmp.isSameOrAfter(start)) {
                        const data = tmp.format('YYYY-MM-DD')
                        await Reserva.create({
                            dataReserva: req.body.dataReserva,
                            sala: req.body.sala,
                            idSolicitante: 1250,
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
                        await Reserva.create({
                            dataReserva: req.body.dataReserva,
                            sala: req.body.sala,
                            idSolicitante: 1250,
                            atividade: req.body.atividade,
                            tipo: req.body.tipo,
                            dataInicio: data,
                            dataTermino: data,
                            horaInicio: req.body.horaInicio,
                            horaTermino: req.body.horaTermino,
                        });
                        tmp.add(7, 'd');
                    }
                }

                res.redirect('/reserva');
            } catch (e) {
                //console.log(req.body);
                console.log(e.errors)
                var salas = await Sala.findAll();

                res.render('reserva/createLote', {
                    errors: e.errors,
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
        include: [{ model: Sala, as: 'salao' }]
    })
    reserva.diaHoraReserva = moment(reserva.dataReserva).format("DD-MM-YYYY HH:mm:ss");
    res.render('reserva/read', { reserva, active: { reservaMenu } });
};

const update = async (req, res) => {
    if (req.route.methods.get) {
        var reserva = await Reserva.findByPk(req.params.id);
        res.render('reserva/update', { reserva, active: { reservaMenu } });
    } else {
        if (!req.body.numero) req.body.numero = null
        try {

            await Reserva.update(req.body, { where: { id: req.body.id } });
            res.redirect('/reserva');
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

        var reserva = await Reserva.findByPk(req.params.id);
        res.render('reserva/remove', { reserva, active: { reservaMenu } });
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
        var sala = await Sala.findByPk(req.params.id);

    } else {
        var reservas = await Reserva.findAll({
            where: {
                dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") }
            },
            include: [{ model: Sala, as: 'salao' }]
        });
    }


    res.render('reserva/listagem', { sala, reservas, active: { reservaMenu } });
}

const calendario = async (req, res) => {
    var salas = await Sala.findAll();
    var reservas = await Reserva.findAll({
        where: {
            // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
            sala: req.params.id
        },
    });


    res.render('reserva/calendario', { reservas, salas, sala: req.params.id, active: { reservaMenu } });
}




module.exports = { index, read, create, update, remove, listagem, calendario, createLote }