const express = require('express');
const router = express.Router();
const sql = require('../models/autenticacao.model')


const sha1 = require('sha1');



//cria um endpoint para autenticar o usuario//
router.post('/autenticar',(req,res)=>{
    //armazena os dados do body em uma variavel
    //para ficar mais legivel
    let requisicao = req.body;
    requisicao.senha = sha1 (requisicao.senha);
    //criptografa a senha utilizando sha1
    //excuta a função para testar o acesso do usuario//
   sql.autenticaUsuario(requisicao.login,requisicao.senha).then((resposta) => {
    console.log(resposta)
    //pega a resposta da função para testar o acesso do usuario//
     if(resposta instanceof Error){
         res.status(500).json(resposta);
         return;
     }
     //verifica se o tamanho da resposta ém 1 (um usuario)
     if(resposta.length != 1){
        //caso negativo, envia satus 401(não autorizado)
        res.status(401).json({mensagem:'usuario não autorizado'})
        return;
    }
    //envia o status 200(ok)
    res.status(200).json(resposta);
   })


})

//endpoint temporario para geração de senha
router.post('/geraSenhaCripto',(req,res)=>{
  //guarda a senha em uma variavel
  let senha = req.body.senha;
  //verifica se a senha não é vazia
  if(!senha || senha == ''){
    res.status(400).json({mensagem:'senha vazia'})
    return;
  }
  senha = sha1(senha);
  res.status(201).json({senha})


})






module.exports = router;