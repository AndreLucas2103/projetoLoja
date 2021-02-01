function registrarFront() {
    function cpf(cpf){
        cpf = cpf.replace(/\D/g, '');
        if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        var result = true;
        [9,10].forEach(function(j){
            var soma = 0, r;
            cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
                soma += parseInt(e) * ((j+2)-(i+1));
            });
            r = soma % 11;
            r = (r <2)?0:11-r;
            if(r != cpf.substring(j, j+1)) result = false;
        });
        return result;
    }

    function enviarDados(params) {
        let senha = $('#senha').val()
        let email = $('#email').val()
        let primeiroNome = $('#primeiroNome').val()
        let segundoNome = $('#segundoNome').val()
        let cpf = $('#cpf').val()

        jQuery.ajax({
            type: "POST",
            url: '/registrar',
            data: {senha: senha, email: email, primeiroNome: primeiroNome, segundoNome: segundoNome, cpf: cpf},
            success: function(response) {
                //'response' é a resposta do servidor
                console.log(response)
                if(response == 200){
                    Swal.fire({
                        icon: 'success',
                        title: 'Conta criada com sucesso!',
                    }).then(ok => {
                        window.location = '/login'
                    })
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocorreu um erro!',
                    }).then(ok => {
                        window.location = window.location
                    })
                }
            }
        });
    }
    
    $("#form-registrar").submit(function(preventDefault){
        let senha1 = $('#senha').val()
        let senha2 = $('#confirmarSenha').val()
        let numberVerificacao = $('#numberVerificacao').val()
        let email = $('#email').val()
        let primeiroNome = $('#primeiroNome').val()
        let segundoNome = $('#segundoNome').val()
        var RegraValida = document.getElementById("cpf").value; 
    
        if(RegraValida == "111.111.111-11" || RegraValida == "222.222.222-00" || RegraValida == "333.333.333-33" || RegraValida == "444.444.444-44" || RegraValida == "555.555.555-55" || RegraValida == "666.666.666-66" || RegraValida == "777.777.777-77" || RegraValida == "888.888.888-88" || RegraValida == "999.999.999-99" ){
            Swal.fire({
                icon: 'error',
                title: 'CPF Inválido!',
            })
            preventDefault.preventDefault();
        }else{
            if(cpf(RegraValida) == true){
                if(senha1.length < 6){
                    Swal.fire({
                        icon: 'error',
                        title: 'Senha muito curta!',
                    })
                    preventDefault.preventDefault();
                }else{
                    if(senha1 === senha2){ 
                        preventDefault.preventDefault()
                        jQuery.ajax({
                            type: "POST",
                            url: '/verificarExisteRegistro',
                            data: {email: email, cpf: RegraValida},
                            success: function(response) {
                                if(response == 420){
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'CPF já cadastrado!',
                                    })
                                }else if(response == 421){
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Email já cadastrado!',
                                    })
                                }else{
                                    enviarDados(123)
                                }
                            }
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'As senhas estão diferentes!',
                        })
                        preventDefault.preventDefault();
                    }
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'CPF Inválido!',
                })
                preventDefault.preventDefault();
            }
        }     
    });
}
