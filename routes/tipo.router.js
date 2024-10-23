const express = require('express')
const router = express.Router()
const sql = require('../models/tipo.model')

router.get('/todos',(req,res)=> {
  sql.getTodos().then((Resposta)=>{
     if(Resposta instanceof Error){
        res.status(500).json(Resposta)
        return;
     }
     res.status(200).json(Resposta)
  })

})
module.exports=router