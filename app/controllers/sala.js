var models = require('../models/index');
var Sala = models.j17_reservas_salas;
var Reserva = models.j17_reservas;

// Esse reservaMenu é pra o sideBar ficar ativo, tudo relacionado ao sidebar vai ser passado no obj active
// Ruim é que tem que passar sempre nos res.render se quiser uma sidebar bonitinha que troca de cor dependendo da view 
// Deve ter outro jeito mas Só consegui desse jeito pra trocar o ativo da sidebar 
var reservaMenu = true;

//Controlador da view index (View com as salas e as opções de ver, alterar, remover)
const index = async (req, res) => {
    // Se quiser incluir as reservas de cada sala descomenta aqui embaixo, se quiser ver as associações.
    var salas = await Sala.findAll(/*{
        include: [{ model: Reserva, as: 'reservas' }]
    }*/);
    res.render('sala/index', { salas ,active:{reservaMenu,salas:true}});
};

//Controlador da view create
const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('sala/create');
    } else {
        // setando null no numero caso não seja passado, senão ele vai registrar como 0
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

//Controlador da view read
const read = async (req, res) => {
    var sala = await Sala.findByPk(req.params.id)
    console.log(sala)
    res.render('sala/read', { sala });
};

//Controlador da view update
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

// Controlador da view update
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