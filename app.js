// Carregando módulos
const express = require('express') // importando express
const app = express() // express chamado para app
const handlebars = require('express-handlebars')
const bodyParser = require("body-parser")
const path = require("path")
const session = require("express-session") //sessao do usuario
const flash = require("connect-flash") //Flash para enviar mensagens
const passport = require("passport") //Autenticacao com o passport
require("./config/auth")(passport) //Autenticacao com o passport
const paginate = require('handlebars-paginate'); //Paginacao 
const Handlebars = require('handlebars') //Paginacao 
Handlebars.registerHelper('paginate', paginate); //Paginacao 

// Módulo de configuração


/*----------------------------------------------------------------------------------------*/
const {eAdmin} = require("./helpers/eAdmin");

/*----------------------------------------------------------------------------------------*/
// Rotas "routes" puxando elas 
    const usuarios = require("./routes/usuario")

    // Rotas para administracao
        const admin = require("./routes/admin/admin")
        const adminConfiguracao = require("./routes/admin/admin-configuracao")

/*----------------------------------------------------------------------------------------*/
// Configuração
// Porta da aplicação 
    const PORT = 3000
    app.listen(PORT,() => {
        console.log("Servidor rodando! OK")
    })

// Sessão
    app.use(session({
        secret: "projetoLojaSecret",
        resave: true,
        saveUninitialized: true
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(flash())

// Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
        next();
    })

    
    app.use(function (req, res, next) {
        if (req.user) {
          res.locals.usuarioLogado = req.user.toObject();
        }
        next();
    });

    app.use(function (req, res, next) {
        const configuracao = require('./config/configuracoes-sistema/configuracao.json')
        res.locals.dadosLoja = configuracao.dadosLoja;

        next();
    });
    

// Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    
// Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    

/*----------------------------------------------------------------------------------------*/
//Banco de dados
const mongoose = require("mongoose")

// Mongoose
    // Conexão com a umbler: mongodb://andre123:123andre@mongo_andre123:27017/andre123
    // Conexão com a umbler: mongodb://blogapp123:blogapp10123@mongo_blogapp123:27017/blogapp123
    // Conexão com o localhot: mongodb://localhost/blogapp
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/projetoLoja", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Conectado ao mongo")
    }).catch((err) => {
        console.log("Erro ao se conectar: "+err)
    })

//Colections        
    

// Public
    app.use(express.static(path.join(__dirname,"public"))) //arquivos estáticos

/*----------------------------------------------------------------------------------------*/
// Modulos e rotinas do sistema


/*----------------------------------------------------------------------------------------*/
// Rotas
    app.get('/', (req, res) => {
        res.render('index')
    })



//Rotas declaradas, onde está tudo separado :)
    app.use('/', usuarios)

    //Rotas para administracao adminConfiguracao
        app.use('/admin', admin)
        app.use('/admin', adminConfiguracao)


/*----------------------------------------------------------------------------------------*/
// Outros -  geralmente é para teste kkk





//----------------------------------------------------------------------------------------
// Enviar dados do meu mongoDb para a umbler:
// mongorestore -h kamino.mongodb.umbler.com:54450 -d blogapp123 -u blogapp123 -p root10123 --drop c:\data\db\blogapp