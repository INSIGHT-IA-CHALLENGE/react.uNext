import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

function Login() {

    useEffect(()=>{
        document.title = "uNext | Login"
    },[])

    return (
        <main className='main-login'>
            <form action="/vagas" className="form-login">
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

                {/* <div className="form__group col-12 alert erro">Email ou Senha incorreta. Tente novamente. </div> */}

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