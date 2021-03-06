const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const passport = require("passport")
const {eAdmin} = require("../helpers/eAdmin")

const nodemailer = require('../modules/nodemailer/usuario-registro')

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

/* ERROS
    420: cpf já cadastrado na base de dados
    421: email já cadastrado na base de dados

*/
router.post('/verificarExisteRegistro', async (req, res)=>{
    Usuario.findOne({cpf: req.body.cpf}).lean().then((usuario) => {
        if(usuario){
            res.json(420)
        }else{
            console.log(req.body.email)
            Usuario.findOne({email: req.body.email}).lean().then(usuario => {
                if(usuario){
                    res.json(421)
                }else{
                    res.json(200)
                }
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})

router.post("/registrar",  (req, res) => {
        Usuario.findOne({email: req.body.email}).lean().then((usuario) => {
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com esse e-mail no sistema! Realize o login.")
                res.redirect("/login")
            }else{
                let email = req.body.email;
                let primeiroNome = req.body.primeiroNome;
                let segundoNome = req.body.segundoNome;
                let cpf = req.body.cpf;
                let senha = req.body.senha;

                const novoUsuario = new Usuario({
                    primeiroNome: primeiroNome,
                    segundoNome: segundoNome,
                    email: email,
                    senha: senha,
                    cpf: cpf,
                    emailConfirmado: false
                })
            
                bcryptjs.genSalt(10, (erro, salt) => {
                    bcryptjs.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            res.json(402)
                        }
            
                        novoUsuario.senha = hash
            
                        novoUsuario.save().then((usuario) => {
                            nodemailer.enviarConfirmacaoEmail(usuario)
                            res.json(200)
                        }).catch((err) => {
                            console.log(err)
                            res.json(401)
                        })
                    })
                })

            }
        }).catch((err) => {
            res.json(401)
        })
})


router.get("/login", (req, res) => {
    res.render("usuarios/login")
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res , next)
})

router.get("/logout", (req, res) =>{
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso sucesso!")
    res.redirect("/")
})

module.exports = router