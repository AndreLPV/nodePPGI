var models = require('../models/index');
const Op = require('../models').Sequelize.Op;
var moment = require('moment');

var Reserva = models.j17_reservas;
var Sala = models.j17_reservas_salas;
var User = models.j17_user;

//Controlador da view index (View com as salas e as opções de ver no calendário ou em lista as reservas)
const index = async (req, res) => {
    var salas = await Sala.findAll({

        include: [{
            model: Reserva,
            as: 'reservas',
            attributes: ['dataInicio']
        }]
    });
    res.render('reserva/index', { salas });
};



//Controlador da view createLote (Reservas criadas pelo opção em lote no index são tratadas aqui)
const createLote = async (req, res) => {
    if (req.route.methods.get) {
        var salas = await Sala.findAll();
        res.render('reserva/createLote', { salas });
    } else {
        // Verificando se algum dia da semana foi marcado

        if (!req.body.dias) {
            var salas = await Sala.findAll();
            res.render('reserva/createLote', {
                msg: "Marque pelo menos um dia da semana",
                reserva: req.body,
                salas
            });
            // Verificando se a sala foi escolhida
            // Aconteceu 2 vezes quando eu testava testando a sala ser passada como 0 mesmo eu tendo escolhido uma
            // Bem estranho, como não consigo reproduzir o caso pra ver onde é o erro e corrigi-lo,
            // por precaução tô fazendo esse if aqui.
        } else if (!req.body.sala) {
            var salas = await Sala.findAll();
            res.render('reserva/createLote', {
                msg: "Escolha uma sala",
                reserva: req.body,
                salas
            });
        } else {
            // Os dias da semana são passado como array, mas se for marcado apenas um dia vai vir uma string
            // então aqui eu passo pra array pra poder fazer tudo no forEach.
            if (!Array.isArray(req.body.dias)) req.body.dias = [req.body.dias];

            var arr = [];
            req.body.dias.forEach((dia) => {
                let start = moment(req.body.dataInicio);
                let end = moment(req.body.dataTermino);

                // pegando o dia da semana (domingo = 0, segunda = 1, terça = 2...)
                let tmp = start.clone().day(dia);
                // Verificando se o dia já passou (quando tava testando de vez em quando 
                // o dia mais próximo na mesma semana não salvava, isso aqui resolveu esse caso)
                if (tmp.isSameOrAfter(start)) {
                    const data = tmp.format('YYYY-MM-DD')
                    arr.push({
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
                // Salvando as datas até chegar na dataTermino
                while (moment(tmp).isSameOrBefore(moment(end))) {
                    const data = tmp.format('YYYY-MM-DD')
                    arr.push({
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
            try {
                // Salvando tudo de uma só vez, infelizmente o validate não funciona muito bem com esse bulkCreate
                // Se der erro não vai aparecer onde foi porque o bulkCreate não gera o e.errors
                await Reserva.bulkCreate(arr, { validate: true });
                res.redirect('/reserva');
            } catch (e) {
                // O validate vai ver que tem erro, mas o e.errors dá undefined, tive que colocar
                // uma mensagem genérica porque não consigo pegar as mensagens individuais do e.errors.  
                //console.log(e.errors)
                var salas = await Sala.findAll();
                res.render('reserva/createLote', {
                    msg: "Um ou mais campos não preenchidos",
                    reserva: req.body,
                    salas,
              
                });
            }
        }
    }
};

// Código para pegar os dias entre dois dias (utilizado como base para o createLote)
/*
    let start = moment();
    start.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    let end = moment('2019-11-26');
    var arr = [];
    // pegando a segunda dessa semana (domingo = 0, segunda = 1, terça = 2...)
    let tmp = start.clone().day('1');
    
    if (tmp.isSameOrAfter(start)) {   arr.push(tmp.format('YYYY-MM-DD'));}
    tmp.add(7, 'd');
    while (moment(tmp).isSameOrBefore(moment(end))) {
        arr.push(tmp.format('YYYY-MM-DD'));
        tmp.add(7, 'd');
    }
    console.log(arr);
*/


//Controlador da view read (disparado quando se clica nos olhos ou em qualquer reserva no calendário)
const read = async (req, res) => {

    // tive que chamar de salao porque sala é o campo que tem o id, se chamar de sala no include vai dá conflito e gerar uns erros.
    var reserva = await Reserva.findByPk(req.params.id, {
        include: [{ model: Sala, as: 'salao' }, { model: User, as: 'user' }]
    })
    reserva.diaHoraReserva = moment(reserva.dataReserva).format("DD-MM-YYYY HH:mm:ss");
    res.render('reserva/read', { reserva });
};

// Controlador da view update (disparado quando se clica no lápis na view read)
const update = async (req, res) => {
    if (req.route.methods.get) {
        var reserva = await Reserva.findByPk(req.params.id, {
            include: [{ model: Sala, as: 'salao' }]
        });
        res.render('reserva/update', { reserva });
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
                
            });
        }
    };
}

// Controlador da view remove (disparado quando se clica no lápis na view read)
// Depois eu troco pra ser por modal e jquery o delete
const remove = async (req, res) => {
    await Reserva.destroy({ where: { id: req.body.id } });
    res.redirect('/reserva');
};


// Controlador da view listagem (disparado quando se clica no segundo icone na view index)
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
        // Fiz diferente, lá no site independente de qual listagem é clicada se mostra tudo,
        // aqui eu filtro pra ser só as reservas da sala clicada.
        var reservas = await Reserva.findAll({
            where: {
                dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") }
            },
            include: [{ model: Sala, as: 'salao' }]
        });
    }
    res.render('reserva/listagem', { sala, reservas});
}

// Controlador da view calendario (disparado quando se clica no primeiro icone na view index)
const calendario = async (req, res) => {
    if (req.route.methods.get) {
        var salas = await Sala.findAll();
        var sala = await Sala.findByPk(req.params.id);

        var reservas = await Reserva.findAll({
            where: {
                // Descomentar a linha abaixo faz com que as reservas mostradas no calendário sejam apenas do dia atual pra frente.
                // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                sala: req.params.id
            },
        });
        res.render('reserva/calendario', { reservas, salas, sala });
    } else {
        try {
            await Reserva.create(req.body);
            res.redirect('/reserva');
        } catch (e) {

            var salas = await Sala.findAll();
            var sala = await Sala.findByPk(req.body.sala);
            var reservas = await Reserva.findAll({
                where: {
                    // Descomentar a linha abaixo faz com que as reservas mostradas no calendário sejam apenas do dia atual pra frente.
                    // dataInicio: { [Op.gte]: moment().format("YYYY-MM-DD") },
                    sala: req.body.sala
                },
            });

            res.render('reserva/calendario', {
                errors: e.errors,
                reserva: req.body,
                sala,
                salas,
                reservas,
               
            });
        }
    }
}




module.exports = { index, read, update, remove, listagem, calendario, createLote }