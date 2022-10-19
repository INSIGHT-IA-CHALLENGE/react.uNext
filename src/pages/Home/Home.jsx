import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Slider from '../../components/Slider/Slider';
import './Home.css'
import './Mobile.css'
import '../../styles/Default.css'

function Home() {

    var $nav
    var $itensMenu

    function rolagem() {
        const scroll = document.scrollingElement.scrollTop + 1;
        const home = 0;
        const servicos = document.getElementById('servicos').offsetTop - 50;
        const duvidas = document.getElementById('duvidas').offsetTop - 50;
        const contato = document.getElementById('contato').offsetTop - 50;

        if (scroll > contato) selecionaItem("contato")
        else if (scroll > duvidas) selecionaItem("duvidas")
        else if (scroll > servicos) selecionaItem("servicos")
        else if (scroll > home) selecionaItem("home")
    }

    function selecionaItem(item) {
        const itens = document.querySelectorAll('.js-item-nav');

        itens.forEach((element) => {
            if (element.attributes.getNamedItem('data-section').value !== item)
                element.classList.remove('selecionado')
            else
                element.classList.add('selecionado')
        })
    }

    function rolarPara(item) {
        const home = 0;
        const servicos = document.getElementById('servicos').offsetTop - 50;
        const duvidas = document.getElementById('duvidas').offsetTop - 50;
        const contato = document.getElementById('contato').offsetTop - 50;

        if (item === "home") window.scrollTo(0, home)
        if (item === "servicos") window.scrollTo(0, servicos + 1)
        if (item === "duvidas") window.scrollTo(0, duvidas + 1)
        if (item === "contato") window.scrollTo(0, contato + 1)
    }

    function abreMenu() {
        if ($nav.classList.contains('ativo')) {
            $nav.classList.remove('ativo')
        } else {
            $nav.classList.add('ativo')
        }
    }

    function enviarMensagem(e) {
        e.preventDefault();

        let botao = formMensagem.current.querySelector('button[type="submit"]')
        botao.innerText = "Enviando...";
        botao.disabled = true;

        let alert = formMensagem.current.querySelector('.alert')

        emailjs.sendForm('service_unext', 'template_nova_mensagem', formMensagem.current, 'oCwvYVowxRDDux-Qk')
            .then((result) => {
                alert.classList.remove("erro");
                alert.classList.add("sucesso");
                alert.innerText = "Mensagem enviada com sucesso. Aguarde sua resposta em seu email."
                formMensagem.current.reset()
            }, (error) => {
                alert.classList.remove("sucesso");
                alert.classList.add("erro");
                alert.innerText = "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde."
            })
            .finally(() => {
                botao.innerText = "Enviar Mensagem";
                botao.disabled = false;
            });
    }

    const formMensagem = useRef();

    useEffect(() => {
        document.title = "uNext | Home"

        $nav = document.querySelector('.nav-home')
        $itensMenu = document.querySelectorAll('.itens-menu li')

        $itensMenu.forEach((element) => {
            element.addEventListener('click', () => {
                $nav.classList.remove('ativo')
                selecionaItem(element.attributes.getNamedItem('data-section').value)
                rolarPara(element.attributes.getNamedItem('data-section').value)
            })
        })

        document.querySelector('.main-home').addEventListener('scroll', () => {
            rolagem()
        })

        rolagem()
    }, [])

    return (
        <>
            <header id="home">
                {/* <!--MENU--> */}
                <nav className='nav-home'>
                    <div className="logo">
                        <a href="/">
                            <img src="/images/logo2.png" height="40" alt="logo" />
                        </a>

                        <div className="hamburguer" onClick={abreMenu}>
                            <span></span>
                        </div>
                    </div>

                    <ul className="itens-menu">

                        <li className="js-item-nav" data-section="home">HOME</li>
                        <li className="js-item-nav" data-section="servicos">SERVIÇOS</li>
                        <li className="js-item-nav" data-section="duvidas">DÚVIDAS</li>
                        <li className="js-item-nav" data-section="contato">CONTATO</li>

                    </ul>

                    <Link to='/login' className='btn-quadrado'>ENTRAR</Link>
                </nav>
                {/* <!--FIM MENU--> */}
            </header>
            {/* <!--FIM HEADER--> */}
            {/* <!--MAIN--> */}
            <main className='main-home'>

                {/* <!-- SLIDER --> */}
                <Slider />
                {/* <!-- FIM SLIDER --> */}

                {/* <!-- SERVIÇOS --> */}
                <div id="servicos">
                    <h1>SERVIÇOS</h1>

                    <div className="cards">

                        <div className="card">
                            <div className="card-title">
                                CANDIDATO
                            </div>
                            <div className="card-content">
                                <i className="fi fi-male"></i>
                                <p>
                                    Cadastro de perfil completo
                                </p>
                                <p>
                                    Busca por vagas de forma simples
                                </p>
                                <p>
                                    Status e feedback das candidaturas
                                </p>
                                <p>
                                    Estatísticas gerais
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-title">
                                RECRUTADOR
                            </div>
                            <div className="card-content">
                                <i className="fi fi-briefcase"></i>
                                <p>
                                    Criar vagas
                                </p>
                                <p>
                                    Filtragem de candidaturas
                                </p>
                                <p>
                                    Criação de prova e testes
                                </p>
                                <p>
                                    Agendamento de entrevistas
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-title">
                                EMPRESA
                            </div>
                            <div className="card-content">
                                <i className="fi fi-building"></i>
                                <p>
                                    Perfil de empresa
                                </p>
                                <p>
                                    Gestão de recrutadores
                                </p>
                                <p>
                                    Divulgação de vagas
                                </p>
                                <p>
                                    Notas e avaliações
                                </p>
                            </div>
                        </div>

                    </div>

                    <h3>
                        Dentre as diversas funcionalidades da nossa plataforma, essas são
                        somente as principais, o que está esperando para se juntar a nós?
                    </h3>

                </div>
                {/* <!-- FIM SERVIÇOS --> */}

                {/* <!-- DUVIDAS --> */}
                <div id="duvidas">
                    <h1>DÚVIDAS</h1>

                    <h3>Perguntas frequentes sobre nossos serviços.</h3>

                    <div className="accordion">
                        <div className="accordion__item">
                            <input type="radio" name="radio-accordion" id="duvida1" />
                            <label className="accordion__title" htmlFor="duvida1">
                                Quem pode utilizar a plataforma?
                            </label>
                            <div className="accordion__content">
                                <p>
                                    Qualquer pessoa pode realizar seu cadastro e acessar a plataforma, porém nosso foco maior é
                                    em oferecer vagas para estagiarios.
                                </p>
                            </div>
                        </div>

                        <div className="accordion__item">
                            <input type="radio" name="radio-accordion" id="duvida2" />
                            <label className="accordion__title" htmlFor="duvida2">
                                Como é calculado o Math Level?
                            </label>
                            <div className="accordion__content">
                                <p>
                                    Todo o calculo do Match Level é baseado nas skills solicitadas na vaga e as skills do
                                    candidato, verificando a porcentagem de compatibilidade entre os dois.
                                </p>
                            </div>
                        </div>

                        <div className="accordion__item">
                            <input type="radio" name="radio-accordion" id="duvida3" />
                            <label className="accordion__title" htmlFor="duvida3">
                                Como posso cadastrar uma vaga?
                            </label>
                            <div className="accordion__content">
                                <p>
                                    Vagas só podem ser cadastradas por recrutadores que estão vinculados a alguma empresa.
                                </p>
                            </div>
                        </div>

                        <div className="accordion__item">
                            <input type="radio" name="radio-accordion" id="duvida4" />
                            <label className="accordion__title" htmlFor="duvida4">
                                Como posso ver todas as funcionalidades do sistema?
                            </label>
                            <div className="accordion__content">
                                <p>
                                    Disponibilizamos um guia completo de tutorias e demonstrações
                                    sobre as funcionalidades do sistema. Para conferir <a href="https://www.youtube.com/"
                                        target="_blank" rel="noreferrer">clique aqui.</a>
                                </p>
                            </div>
                        </div>

                        <div className="accordion__item">
                            <input type="radio" name="radio-accordion" id="duvida5" />
                            <label className="accordion__title" htmlFor="duvida5">
                                Posso acessar o sistema do meu celular?
                            </label>
                            <div className="accordion__content">
                                <p>
                                    Nossos sistemas são 100% online podendo ser acessados tanto pelo computador quanto pelo
                                    celular, basta utilizar o navegador de sua preferência.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- FIM DUVIDAS --> */}
                {/* <!-- CONTATO --> */}
                <div id="contato">
                    <h1>CONTATO</h1>

                    <h3>Ainda está com alguma dúvida? Entre em contato conosco!</h3>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1828.421177476758!2d-46.62432174127808!3d-23.574104700000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce597abf1a28ff%3A0x1b02a58f85e6395e!2sFIAP!5e0!3m2!1spt-BR!2sbr!4v1652773186247!5m2!1spt-BR!2sbr"
                        style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                        title="Mapa"></iframe>

                    <div className="contatos-infos">
                        <div className="contatos-infos__item">
                            <i className="fi fi-maps-line bg-black"></i>
                            <div className="contatos-infos__content">
                                Aclimação
                                <br />
                                São Paulo - SP
                            </div>
                        </div>

                        <div className="contatos-infos__item">
                            <i className="fi fi-envelope bg-vermelho"></i>
                            <div className="contatos-infos__content">
                                <a href="mailto:contato@unext.com">contato@unext.com</a>
                            </div>
                        </div>

                        <div className="contatos-infos__item">
                            <i className="fi fi-phone bg-azul"></i>
                            <div className="contatos-infos__content">
                                <a href="tel:+5511995450088">(11) 99545-0088</a>
                            </div>
                        </div>
                    </div>

                    <form ref={formMensagem} className="form" onSubmit={enviarMensagem}>
                        <h2 className="form__title">Envie <span>uma mensagem</span></h2>

                        <div className="form__inputs">
                            <div className="form__group col-6 nome">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" name="from_name" id="nome" required className="form__control nome" placeholder="Nome"
                                    autoComplete="off" />
                            </div>

                            <div className="form__group col-6 email">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="from_email" id="email" required className="form__control" placeholder="Email"
                                    autoComplete="off" />
                            </div>

                            <div className="form__group col-12 mensagem">
                                <label htmlFor="mensagem">Mensagem</label>
                                <textarea type="area" name="message" id="mensagem" required className="form__control" placeholder="Mensagem" autoComplete="off"></textarea>
                            </div>

                            {/* <div className="form__group col-12 alert sucesso">Mensagem enviada com sucesso. Aguarde sua resposta em seu email.</div>

                            <div className="form__group col-12 alert erro">Ocorreu um erro ao enviar a mensagem. Tente novamente.</div> */}

                            <div className="form__group col-12 alert"></div>


                            <button type="submit" className="form__control">Enviar Mensagem</button>
                        </div>
                    </form>
                </div>

                {/* <!-- FIM CONTATO --> */}

            </main>
            {/* <!--FIM MAIN--> */}
            {/* <!--FOOTER--> */}
            <footer className='footer-home'>
                <img src="/images/logo1.png" height="45" alt="logo" />

                <div className="social">
                    <a target="_blank" href="/" rel="noreferrer"><i className="fi fi-facebook"></i></a>
                    <a target="_blank" href="/" rel="noreferrer"><i className="fi fi-instagram"></i></a>
                    <a target="_blank" href="/" rel="noreferrer"><i className="fi fi-twitter"></i></a>
                    <a target="_blank" href="/" rel="noreferrer"><i className="fi fi-linkedin"></i></a>
                </div>

                <p>Desenvolvido por uNext</p>
                <p>© Todos os direitos reservados</p>
            </footer>
            {/* <!--FIM FOOTER--> */}
        </>
    )
}

export default Home;