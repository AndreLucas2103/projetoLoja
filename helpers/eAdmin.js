module.exports = {
    eAdmin: function(req, res, next){

        if(req.isAuthenticated()){
            console.log('ok')
            return next();
        }

        req.flash("error_msg", "Você não possui permissão de acesso a essa pagina!")
        res.redirect("/")
    }
}

