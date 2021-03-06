const mysql = require ('../mysql').pool;


exports.getProdutos = (req, res, next) => {
    //res.status(200).send({
    //    mensagem: 'Usando o GET dentro da rota produtos'
    //})

    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos;',
            
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({error: error})};
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod=>{
                        return{
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            dataregisto: prod.dataentrada,
                            imagem_produto: prod.imagem_produto,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um produto especifico',
                                url: 'http://localhost:3000/produtos/buscar/' + prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    });
}

exports.postProdutos = (req, res, next) => {
    console.log(req.usuario)
   
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?);',
            //'INSERT INTO produtos (nome, preco, imagem_produto, id_usuario) VALUES (?,?,?, ?);',
            [
                req.body.nome, 
                req.body.preco,
                req.file.path
                //,req.usuario.id_usuario
            ],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.insertId,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos produtos',
                            url: 'http://localhost:3000/produtos/buscar'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });  
}

exports.getUmProduto = (req, res, next)=>{
    const id = req.params.id_produtos

    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error })};

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'N??o foi encontrado produto com este ID'
                    })
                }

                const response = {
                   // mensagem: 'Produto inserido com sucesso',
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        dataregisto: result[0].dataentrada,
                        imagem_produto:result[0].imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos produto',
                            url: 'http://localhost:3000/produtos/buscar'
                        }
                    }
                }
                return res.status(200).send(response);

            }
        )
    }); 
}

exports.updateProduto = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE produtos
                SET nome = ?,
                    preco = ?
                WHERE id_produto = ?`,
            [
                req.body.nome,
                req.body.preco, 
                req.body.id_produto
            ],

            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}

                 const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado: {
                        id_produto: result.id_produto,
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto especifico',
                            url: 'http://localhost:3000/produtos/buscar/' + req.body.id_produto
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )
    });
}

exports.deleteProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?',
            [ req.body.id_produto],

            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto removido',
                    request:{
                        tipo: 'POST',
                        descricao: 'Insere um produto novo',
                        url: 'http://localhost:3000/pedido/cadastrar',
                        body:{
                            nome: 'string',
                            preco: 'float',
                            imagem_produto: 'string'
                        }
                    }
                }
                res.status(202).send(response);
            }
        )
    });
};