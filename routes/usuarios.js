const express = require('express');
const router = express.Router();



const usuarios = require ('../controllers/usuarios-controller');

router.post('/cadastro', usuarios.postCadastroUsuarios);

router.post('/login', usuarios.loginUsuarios);

module.exports = router;