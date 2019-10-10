//var models = require('../models/index');
//var sala = models.sala;


const index = async (req, res) => {
    //var salas = await sala.findAll();
    salas = [{nome:"gay"}]
    res.render('sala/index', { salas });
};

const create = async (req, res) => {
    if (req.route.methods.get) {
        res.render('sala/create');
    } else {
        try {
            await sala.create(req.body);
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
    var sala = await sala.findByPk(req.params.id)
    res.render('sala/read', { sala });
};

const update = async (req, res) => {
    if (req.route.methods.get) {
        var sala = await sala.findByPk(req.params.id);
        res.render('sala/update', { sala });
    } else {
        try {
            await sala.update(req.body, { where: { id: req.body.id } });
            res.redirect('/sala');
        } catch (e) {

            res.render('sala/update', {
                errors: e.errors,
            });
        }
    };
}
const remove = async (req, res) => {
    if (req.route.methods.get) {

        var sala = await sala.findByPk(req.params.id);
        res.render('sala/remove', { sala });
    } else {

        await sala.destroy({ where: { id: req.body.id } });
        res.redirect('/sala');

    }
};

module.exports = { index, read, create, update, remove }