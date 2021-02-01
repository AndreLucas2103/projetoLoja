const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Usuario = new Schema({
    primeiroNome: {
        type: String,
        required: true
    },
    segundoNome: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    celularContato: {
        type: String,
    },
    cep: {
        type: String
    },
    cidade: {
        type: String
    },
    rua: {
        type: String
    },
    numero: {
        type: Number
    },
    bairro: {
        type: String
    },
    uf: {
        type: String
    },
    completemento: {
        type: String
    },
    receberNewsletter: {
        type: Boolean,
        default: false
    },
    statusAtivo: {
        type: Boolean,
        default: true
    },
    emailConfirmado: {
        type: Boolean,
    },
    eAdmin: {
        type: Number,
        default: 200
    },
    
},{ timestamps: true})

mongoose.model("usuarios", Usuario)