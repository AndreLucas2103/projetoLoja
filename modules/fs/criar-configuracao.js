const mongoose = require("mongoose")
const fs = require('fs')

module.exports.criarConfiguracao = (dados) => {

const data = `{
    "configuracaoSistema": {
        "nodemailer": {
            "smptNodemailer": "${dados.smptNodemailer}",
            "emailNodemailer": "${dados.emailNodemailer}",
            "senhaEmailNodemailer": "${dados.senhaEmailNodemailer}"
        }
    },
    "dadosLoja":{
        "nomeLoja": "${dados.nomeLoja}",
        "emailLoja": "${dados.emailLoja}",
        "enderecoLoja": "${dados.enderecoLoja}",
        "telefoneLoja": "${dados.telefoneLoja}"
    }
}`
    
    fs.writeFile('./config/configuracoes-sistema/configuracao.json', data, (err) => {
        if (err) throw err;
        console.log('Arquivo de cofiguração criado');
    });

};