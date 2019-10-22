const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const salaController = require('../app/controllers/sala');
const reservaController = require('../app/controllers/reserva');


//MainController

router.get('/' ,                    mainController.index);
router.get('/sobre' ,               mainController.sobre);
router.get('/ui' ,                  mainController.ui);

//salaController

router.get('/sala' ,               salaController.index);
router.get('/sala/create' ,        salaController.create);
router.post('/sala/create' ,       salaController.create);
router.get('/sala/read/:id' ,      salaController.read);
router.get('/sala/update/:id' ,    salaController.update);
router.post('/sala/update' ,       salaController.update);
router.get('/sala/remove/:id' ,    salaController.remove);
router.post('/sala/remove' ,       salaController.remove);

router.get('/reserva' ,               reservaController.index);
router.get('/reserva/create' ,        reservaController.create);
router.post('/reserva/create' ,       reservaController.create);
router.get('/reserva/read/:id' ,      reservaController.read);
router.get('/reserva/update/:id' ,    reservaController.update);
router.post('/reserva/update' ,       reservaController.update);
router.get('/reserva/remove/:id' ,    reservaController.remove);
router.post('/reserva/remove' ,       reservaController.remove);

router.get('/reserva/listagem/:id' ,    reservaController.listagem);
router.get('/reserva/listagem' ,    reservaController.listagem);
router.get('/reserva/calendario/:id' ,    reservaController.calendario);
router.get('/reserva/calendario' ,    reservaController.calendario);


module.exports = router;




module.exports = router;