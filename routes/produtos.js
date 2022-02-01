const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require ('../middleware/login');

const produtosController = require ('../controllers/produtos-controller');

const storageone = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,  'uploads/');
    },
    filename: function(req, file, cb){
        //cb(null, new Date().toISOString() + file.originalname);
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
});

multer({ storage: storageone});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg'  || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, null);
    }
}

const upload = multer({
     storage: storageone,
     limits :{
        fileSize: 1024 * 1024 * 5
     },
        fileFilter: fileFilter
     
    });

//Retorna todos produtos
router.get('/buscar', produtosController.getProdutos);

//Insere um produto
router.post(
    '/cadastrar',
    login.obrigatorio,
    upload.single('produto_imagem'), 
    produtosController.postProdutos
);

//retorna os dados de um produto
router.get('/buscar/:id_produto', produtosController.getUmProduto);

// Atualizar
router.patch('/atualizar', login.obrigatorio, produtosController.updateProduto);

// Deletar
router.delete('/remover', login.obrigatorio, produtosController.deleteProdutos);




module.exports = router;