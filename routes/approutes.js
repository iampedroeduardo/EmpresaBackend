const express=require('express');
const router = express.Router();
var myController = require("../controllers/my_controller");

router.get('/',myController.inicio);
router.post('/pesquisa',myController.pesquisa);
router.get('/cadastrar',myController.cadastrar);
router.post('/cadastro',myController.cadastro);
router.get('/delete/:id',myController.delete);
router.get('/editar/:id',myController.editar);
router.post('/update',myController.update);

module.exports = router