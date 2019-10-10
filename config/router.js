const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');
const salaController = require('../app/controllers/sala');


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



module.exports = router;




module.exports = router;