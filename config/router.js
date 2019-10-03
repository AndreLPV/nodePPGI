const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/main');


//MainController

router.get('/' ,                    mainController.index);
router.get('/sobre' ,               mainController.sobre);
router.get('/ui' ,                  mainController.ui);




module.exports = router;