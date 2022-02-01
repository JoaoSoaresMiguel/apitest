const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const pedidosController = require ('../controllers/pedidos-controller');


//Retorna todos pedidos
router.get('/buscar', pedidosController.getPedidos);

//Insere um pedido
router.post('/cadastrar', pedidosController.postPedidos);

//retorna os dados de um pedido
router.get('/buscar/:id_pedido', pedidosController.getUmPedido);

//Exclui um pedido
router.delete('/remover', pedidosController.deletePedido);



module.exports = router;