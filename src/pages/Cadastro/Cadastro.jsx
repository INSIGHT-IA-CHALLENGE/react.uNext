import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import IMask from 'imask';
import { useState } from 'react';

function Cadastro() {

    const [tipoCadastro, setTipoCadastro] = useState("candidato")
    const [sexo, setSexo] = useState()

    //TROCAR ENTRE PESSOA E EMPRESA
    var formPessoa
    var formEmpresa

    function desativaFormEmpresa() {
        formPessoa.classList.add('type--ativo')
        formEmpresa.classList.remove('type--ativo')

        formEmpresa.querySelectorAll('input').forEach(input => {
            input.disabled = true;
        })

        formPessoa.querySelectorAll('input').forEach(input => {
            input.disabled = false;
        })

        setTipoCadastro('candidato')
        mascarasPessoa()
    }

    function desativaFormPessoa() {
        formEmpresa.classList.add('type--ativo')
        formPessoa.classList.remove('type--ativo')

        formEmpresa.querySelectorAll('input').forEach(input => {
            input.disabled = false;
        })

        formPessoa.querySelectorAll('input').forEach(input => {
            input.disabled = true;
        })

        setTipoCadastro('empresa')
        mascarasEmpresa()
    }

    //MASCARAS DOS CAMPOS
    function mascarasEmpresa() {
        const cnpj = document.getElementById('cnpj')
        IMask(cnpj, { mask: '00.000.000/0000-00' })
    }

    function mascarasPessoa() {
        const cpf = document.getElementById('cpf')
        IMask(cpf, { mask: '000.000.000-00' })
    }

    function pesquisacep(valor) {
        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep !== "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                //Url do via cep
                let url = 'https://viacep.com.br/ws/' + cep + '/json';

                //Requisição para a API
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => {
                        insereRetornoCep(json)
                    })
                    .catch(() => {
                        limpaEndereco()
                    })

            } //end if.
            else {
                //cep é inválido.
                limpaEndereco();
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpaEndereco();
        }
    }

    function insereRetornoCep(conteudo) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    }

    function limpaEndereco() {
        document.getElementById('rua').value = null;
        document.getElementById('bairro').value = null;
        document.getElementById('cidade').value = null;
        document.getElementById('uf').value = null;
        document.getElementById('numero').value = null;
        document.getElementById('referencia').value = null;
    }

    useEffect(() => {
        document.title = "uNext | Cadastro"

        formPessoa = document.querySelector('.pessoa')
        formEmpresa = document.querySelector('.empresa')

        //BUSCAR ENDEREÇO
        document.getElementById('cep').addEventListener('change', element => {
            let cep = element.target.value
            if (cep.length === 9)
                pesquisacep(cep)
        })

        document.querySelectorAll("input[name='tipoCadastro']").forEach(elemento => {
            elemento.addEventListener('click', () => {
                if (elemento.value === "candidato") {
                    desativaFormEmpresa()
                } else {
                    desativaFormPessoa()
                }
            })
        })


        //MASCARAS
        const cep = document.getElementById('cep')
        IMask(cep, { mask: '00000-000' })

        const numero = document.getElementById('numero')
        IMask(numero, { mask: new RegExp(/^[0-9]*$/) })

        //INIT 
        desativaFormEmpresa()
    }, [])

    async function submitHandler(e) {
        e.preventDefault();
        let form = e.target;
        let json = ''

        if (tipoCadastro == 'candidato')
            json = getDadosCandidato(form)
        else
            json = getDadosEmpresa(form)

        await cadastraUsuario(json, form)
    }

    async function cadastraUsuario(json, form) {
        console.log(json)
        fetch(`http://localhost:8080/uNext/rest/usuario/${tipoCadastro}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: json
        })
            .then(response => {
                let alert = form.querySelector('.alert')

                if (response.status === 201) {
                    alert.innerText = 'Conta criada com sucesso!'
                    alert.classList.add('sucesso')
                    alert.classList.remove('erro')
                    form.reset()

                } else {
                    alert.classList.add('erro')
                    alert.classList.remove('sucesso')
                    if (response.status === 409)
                        alert.innerText = 'O email já está sendo utilizado!'
                    else
                        alert.innerText = 'Não foi possível cadastrar sua conta!'
                }
            })
            .catch(() => {
                let alert = form.querySelector('.alert')
                alert.classList.add('erro')
                alert.classList.remove('sucesso')
                alert.innerText = 'Não foi possível cadastrar sua conta! Tente novamente mais tarde.'

            })
    }

    function getDadosCandidato(form) {
        let data = {
            nome: form.querySelector('#nome').value,
            rg: form.querySelector('#rg').value,
            cpf: form.querySelector('#cpf').value,
            dataNascimento: form.querySelector('#dtNascimento').value.split('-').reverse().join('/'),
            sexo: sexo,
            escolaridade: form.querySelector('#escolaridade').value,
            usuario: {
                login: form.querySelector('#email').value,
                senha: form.querySelector('#senha').value
            },
            endereco: {
                logradouro: form.querySelector('#rua').value,
                numero: form.querySelector('#numero').value,
                complemento: form.querySelector('#referencia').value,
                bairro: form.querySelector('#bairro').value,
                cidade: form.querySelector('#cidade').value,
                uf: form.querySelector('#uf').value,
                cep: form.querySelector('#cep').value,
            }
        }

        return JSON.stringify(data)
    }

    function getDadosEmpresa(form) {
        let data = {
            nome: form.querySelector('#nmEmpresa').value,
            razaoSocial: form.querySelector('#razaoSocial').value,
            cnpj: form.querySelector('#cnpj').value,
            usuario: {
                login: form.querySelector('#email').value,
                senha: form.querySelector('#senha').value
            },
            enderecos: [{
                logradouro: form.querySelector('#rua').value,
                numero: form.querySelector('#numero').value,
                complemento: form.querySelector('#referencia').value,
                bairro: form.querySelector('#bairro').value,
                cidade: form.querySelector('#cidade').value,
                uf: form.querySelector('#uf').value,
                cep: form.querySelector('#cep').value,
            }]
        }

        return JSON.stringify(data)
    }

    return (
        <main className='main-login'>
            <form action="" className="form-login" onSubmit={submitHandler}>
                <div className="title">
                    <Link to="/login">
                        <span>Voltar</span>
                    </Link>
                    <h1>Cadastrar</h1>
                </div>

                {/* <!-- TIPO CADASTRO --> */}
                <div className="form__group col-12">
                    <label>Tipo de Cadastro</label>

                    <div className="radio__group">
                        <div>
                            <input type="radio" name="tipoCadastro" value="candidato" id="candidato" required defaultChecked />
                            <label htmlFor="candidato">Candidato</label>
                        </div>

                        <div>
                            <input type="radio" name="tipoCadastro" value="empresa" id="empresa" />
                            <label htmlFor="empresa">Empresa</label>
                        </div>
                    </div>
                </div>

                {/* <!-- INFORMAÇÕES DE PESSOA --> */}
                <div className="type type--ativo pessoa">
                    <div style={{ width: '100%' }}>
                        <div className="form__group col-12 nome">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form__control" placeholder="Nome Completo" required name="nome" id="nome" />
                        </div>

                        <div className="form__group col-12 documento">
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" className="form__control" placeholder="CPF" required name="cpf" id="cpf" />
                        </div>

                        <div className="form__group col-12 documento">
                            <label htmlFor="cpf">RG</label>
                            <input type="text" className="form__control" placeholder="RG" required name="rg" id="rg" />
                        </div>

                        <div className="form__group col-6">
                            <label>Sexo</label>

                            <div className="radio__group">
                                <div>
                                    <input type="radio" name="sexo" id="masculino" required onClick={() => setSexo('M')} />
                                    <label htmlFor="masculino">Masculino</label>
                                </div>

                                <div>
                                    <input type="radio" name="sexo" id="feminino" onClick={() => setSexo('F')} />
                                    <label htmlFor="feminino">Feminino</label>
                                </div>
                            </div>
                        </div>

                        <div className="form__group col-12">
                            <label htmlFor="cpf">Escolaridade</label>

                            <select className="form__control" required name='escolaridade' id='escolaridade'>
                                <option value="Fundamental Completo">Fundamental Completo</option>
                                <option value="Médio Incompleto">Médio Incompleto</option>
                                <option value="Médio Completo">Médio Completo</option>
                                <option value="Superior Incompleto">Superior Incompleto</option>
                                <option value="Superior Completo">Superior Completo</option>
                            </select>
                        </div>

                        <div className="form__group col-12 data">
                            <label htmlFor="cpf">Data de Nascimento</label>
                            <input type="date" className="form__control" required name="dtNascimento" id="dtNascimento"
                                placeholder="dd/mm/aaaa" />
                        </div>
                    </div>
                </div>

                {/* <!-- INFORMAÇÕES DE EMPRESA --> */}
                <div className="type empresa">
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div className="form__group col-12 empresa">
                            <label htmlFor="nmEmpresa">Nome Empresa</label>
                            <input type="text" className="form__control" placeholder="Nome Empresa" required name="nmEmpresa"
                                id="nmEmpresa" />
                        </div>

                        <div className="form__group col-12 empresa">
                            <label htmlFor="razaoSocial">Razão Social</label>
                            <input type="text" className="form__control" placeholder="Razão Social" required name="razaoSocial"
                                id="razaoSocial" />
                        </div>

                        <div className="form__group col-12 documento">
                            <label htmlFor="cnpj">CNPJ</label>
                            <input type="text" className="form__control" placeholder="CNPJ" required name="cnpj" id="cnpj" />
                        </div>
                    </div>
                </div>

                {/* <!-- INFORMAÇÕES DE LOGIN --> */}
                <div className="form__group col-6 endereco">
                    <label htmlFor="cep">CEP</label>
                    <input type="text" className="form__control" placeholder="00000-000" required name="cep" id="cep" />
                </div>

                <div className="form__group col-6 endereco">
                    <label htmlFor="uf">UF</label>
                    <input type="text" className="form__control" placeholder="UF" required name="uf" id="uf" readOnly />
                </div>

                <div className="form__group col-12 endereco">
                    <label htmlFor="rua">Rua</label>
                    <input type="text" className="form__control" placeholder="Rua" required name="logradouro" id="rua"
                        readOnly />
                </div>

                <div className="form__group col-12 endereco">
                    <label htmlFor="bairro">Bairro</label>
                    <input type="text" className="form__control" placeholder="Bairro" required name="bairro" id="bairro"
                        readOnly />
                </div>

                <div className="form__group col-12 endereco">
                    <label htmlFor="cidade">Cidade</label>
                    <input type="text" className="form__control" placeholder="Cidade" required name="cidade" id="cidade"
                        readOnly />
                </div>

                <div className="form__group col-12 endereco">
                    <label htmlFor="referencia">Ponto de Referência</label>
                    <input type="text" className="form__control" placeholder="Ponto de Referência" name="referencia"
                        id="referencia" />
                </div>

                <div className="form__group col-6 endereco">
                    <label htmlFor="numero">Número</label>
                    <input type="text" className="form__control" placeholder="Número" required name="numero" id="numero" maxLength={9}/>
                </div>

                <div className="form__group col-12 email">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form__control" placeholder="Email" required name="email" id="email" />
                </div>

                <div className="form__group col-12 senha">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form__control" placeholder="Senha" required name="senha" id="senha" minLength={5}/>
                </div>

                {/* <!-- MENSAGEM DE ERRO --> */}
                <div className="form__group col-12 alert"></div>

                {/* <!-- BOTÃO CADASTRAR --> */}
                <div className="center">
                    <button type="submit" className="form__control">Cadastrar</button>
                </div>

            </form>
        </main>
    )
}

export default Cadastro;