const mysql = require ('../mysql').pool;

exports.getPedidos = (req, res, next) => { 
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query( `SELECT pedidos.id_pedido,
                            pedidos.quantidade,
                            produtos.id_produto,
                            produtos.nome,
                            produtos.preco
                        FROM pedidos
                    INNER JOIN produtos
                        ON produtos.id_produto = pedidos.id_produto;`,
            
            (error, result, fields) => {
                conn.release();
                if(error){return res.status(500).send({error: error})};
                const response = {
                    quantidade_de_pedidos: result.length,
                    pedidos: result.map(pedido=>{
                        return{
                            idpedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,

                            produto:{
                                idproduto: pedido.id_produto,
                                nome: pedido.nome,
                                preco: pedido.preco
                            },
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedido especifico',
                                url: 'http://localhost:3000/pedidos/buscar/' + pedido.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    });
};

exports.postPedidos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })};
    conn.query(
       'SELECT * FROM produtos WHERE id_produto = ?', 
       [req.body.id_produto],
       (error, result, field) =>{
         
       if (error){return res.status(500).send({error: error})} 
       if(result.length == 0){
        return res.status(404).send({
            mensagem: ' produto Não foi encontrado'
        })
    }
    conn.query(
            'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?);',
            [req.body.id_produto, req.body.quantidade],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Pedido efectuado com sucesso',
                    pedidocriado: {
                        id_pedido: result.insertId,
                        id_produto: req.body.id_produto,
                        quantidade: req.body.quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos pedidos',
                            url: 'http://localhost:3000/pedidos/buscar'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
        })
    }); 
};

exports.getUmPedido = (req, res, next)=>{
    const id = req.params.id_pedido
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?;',
            [req.params.id_pedido],
            (error, result, fields) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error })};

                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado pedido com este ID'
                    })
                }

                const response = {
                   // mensagem: 'Produto inserido com sucesso',
                    pedidos: {
                        id_pedido: result[0].id_pedido,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos pedidos',
                            url: 'http://localhost:3000/pedidos/buscar'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    });    
};

exports.deletePedido = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM pedidos WHERE id_pedido = ?',
            [ req.body.id_pedido],

            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'pedido removido com sucesso',
                    request:{
                        tipo: 'POST',
                        descricao: 'Insere um pedido novo',
                        url: 'http://localhost:3000/pedidos/cadastrar',
                        body:{
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                res.status(201).send(response);
            }
        )
    });
};