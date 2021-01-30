const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")

require("../../models/Usuario")
const Usuario = mongoose.model("usuarios")

router.get("/usuarios",  (req, res) => {
    Usuario.find().lean().then(usuarios => {
        res.render("admin/usuarios/usuarios", {usuarios: usuarios})
    }).catch(err => {
        console.log(err)
    })
})


module.exports = router