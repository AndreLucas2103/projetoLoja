const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

const configuracao = require('../../config/configuracoes-sistema/configuracao.json')

const fs = require('../../modules/fs/criar-configuracao')

router.get("/configuracoes", (req, res) => {
    res.render("admin/configuracao/configuracao", {configuracao: configuracao})
})

router.post('/arquivo-configuracao', (req, res) => {
    fs.criarConfiguracao(req.body)

    req.flash("success_msg", "Dados alterado com sucesso!")
    res.redirect('back')
   
})


module.exports = router