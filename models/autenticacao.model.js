//insere a conexão com o banco de dados dentro do modelo//
const conexao = require('../database/connection');

//cria uma função assincrona para o modelo//
//fimção de autenticação requer usuario e senha//
async function autenticaUsuario(usuario,senha){
//utiliza estrutura de decisão try..catch para tentar//
//a conexão com o banco de dados e execução da query//    
   try{
  
    //executa a query e armazena a resposta em uma constante
    const [exec] = await conexao.query(`
        select
          id_usuario
          from tb_usuario
          where login = ? and senha = ?
        `,[usuario,senha])
        //retorna a resposta//
        return exec; 
    

   }catch(erro){
    //Caso haja algum erro, coloca dentro da variavel erro//
    //e usa a função return para retornar para o usuario//
      return erro;
   }
}


module.exports = {
    autenticaUsuario
    
}