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
                        title: 'E-mail já existe!',
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

        jQuery.ajax({
            type: "POST",
            url: '/verificarEmailExiste',
            data: {email: email},
            success: function(response) {
                //'response' é a resposta do servidor
                if(response == 200){
                    console.log('Email não existe')
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'E-mail já existe!',
                    }).then(ok => {
                        window.location = window.location
                    })
                }
            }
        });
    
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
                    if(senha1 === senha2){ // está tudo certo, agora será enviado um e-mail de confirmação
                        preventDefault.preventDefault();
                        jQuery.ajax({
                            type: "POST",
                            url: '/enviarEmailConfirmacao',
                            data: {number: numberVerificacao, email: email, primeiroNome: primeiroNome, segundoNome: segundoNome},
                            success: function(response) {
                                //'response' é a resposta do servidor
                                if(!response){
                                    $('#alunos').append('<option value="selecione">Nenhum Aluno</option>');
                                }else{
                                    for (var i = 0; i < response.length; i++) {
                                        $('#alunos').append('<option value="' + response[i]._id + '">' + response[i].nomeAluno + "</option>");
                                    }
                                }
                            }
                        });

                        Swal.fire({
                            title: 'Digite o código de confirmação enviado para o e-mail',
                            input: 'text',
                            inputAttributes: {
                              autocapitalize: 'off'
                            },
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showCancelButton: false,
                            confirmButtonText: 'Confirmar código',
                            inputValidator: (value) => {
                                return new Promise((resolve) => {
                                    console.log(numberVerificacao)
                                  if (value === numberVerificacao) {
                                    resolve()
                                  } else {
                                    resolve('Código inválido!')
                                  }
                                })
                            }
                        }).then(ok => {
                            enviarDados(123)
                        })

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
    
    $('#numberVerificacao').val(parseInt(Math.random()* 655362))
}

function confirmar(codigo) {
    $("#form-confirmar").submit(function(preventDefault){
        let cod2 = codigo
        let cod1 = $('#numeroConfirmacao').val()
        
        if(cod1 === cod2){

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Código inválido!',
            })
            preventDefault.preventDefault();
        }
    });
}