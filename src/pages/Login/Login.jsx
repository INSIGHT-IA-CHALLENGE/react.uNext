import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logar, validaLogin } from '../../auth/auth';
import './Login.css'

function Login() {

    useEffect(() => {
        document.title = "uNext | Login"

        if (validaLogin())
            window.location.replace('/vagas')
    }, [])

    async function submitHandler(e) {
        e.preventDefault();

        const form = e.target

        logar({
            login: form.querySelector('#email').value,
            senha: form.querySelector('#senha').value
        })
            .then(status => {
                if (status == 200) {
                    window.location.replace('/vagas')
                }
                else {
                    const alert = form.querySelector('.alert')
                    alert.classList.add('erro')

                    if (status === 404)
                        alert.innerText = "Email ou Senha incorreta. Tente novamente."
                    else
                        alert.innerText = "Ocorreu um problema ao logar. Tente novamente."
                }
            })
    }

    return (
        <main className='main-login'>
            <form action="/vagas" className="form-login" onSubmit={submitHandler}>
                <div className="title">
                    <Link to="/">
                        <img src="/images/logo3.png" alt="Logo" />
                    </Link>
                </div>

                <div className="form__group col-12 email">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form__control" placeholder="Email" required name="email" id="email" />
                </div>
                <div className="form__group col-12 senha">
                    <label htmlFor="senha">Senha</label>
                    <input type="password" className="form__control" placeholder="Senha" required name="senha" id="senha" />
                </div>

                <div className="form__group col-12 alert"></div>

                <div className="center">
                    <button type="submit" className="form__control">Entrar</button>
                </div>

                <div className="center botoes-login">
                    <Link to="/cadastro">Quero me cadastrar</Link>
                    <Link to="/recuperarSenha">Esqueci minha senha</Link>
                </div>

            </form>
        </main>
    )
}

export default Login;