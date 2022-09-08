import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import Header from '../../components/Header/Header';
import PerfilConteudo from '../../components/PerfilConteudo/PerfilConteudo';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Perfil.css'

function Perfil() {

    const [user, setUser] = useState({
        img: '',
        nome: '',
        idade: 0,
        escolaridade: '',
        ocupacao: '',
        localidade: '',
        contatos: [],
        formacoes: [],
        skills: []
    })

    useState(() => {
        let loadUser = {
            img: 'https://media-exp1.licdn.com/dms/image/C4D03AQHmtbAJ_Hoi_A/profile-displayphoto-shrink_200_200/0/1662053560598?e=1668038400&v=beta&t=sppE43yX0XUoJBlFkVV95sfcMinmVsYgnq8Ar92QdN4',
            nome: 'Gustavo Balero Cosse de Sousa',
            idade: 21,
            escolaridade: 'Superior Incompleto',
            ocupacao: 'Estudante',
            localidade: 'São Paulo',
            contatos: [{
                descricao: 'Telefone',
                itens: ['(11) 99504-9078', '(11) 2552-2092']
            }, {
                descricao: 'Email',
                itens: ['gubalero@hotmail.com', 'gustavo.sousa@fiap.com.br']
            }],
            formacoes: [{
                descricao: 'Fiap',
                grau: 'Técnologo',
                curso: 'Análise e Desenvolvimento de Sistemas',
                inicio: '17/02/2022',
                termino: '05/12/2023'
            }, {
                descricao: 'Etec de Guaianazes',
                grau: 'Técnico',
                curso: 'Informática',
                inicio: '17/02/2016',
                termino: '05/12/2018'
            }],
            skills: [{
                descricao: 'HTML',
                nivel: 8
            }, {
                descricao: 'CSS',
                nivel: 8
            }, {
                descricao: 'JAVA',
                nivel: 7
            }, {
                descricao: 'Oracle DB',
                nivel: 5
            }, {
                descricao: 'JavaScript',
                nivel: 9
            }]
        }

        setUser(loadUser)
    }, [])

    return (
        <>
            <Header />

            <main className="container">
                <div className="perfil">

                    <div className="perfil__header">
                        <img src={user.img} alt="Foto de Perfil" />
                        <div>
                            <h1>{user.nome}</h1>
                            <h3>{user.idade} Anos</h3>
                            <h3>{user.escolaridade}</h3>
                            <h3>{user.ocupacao}</h3>
                            <h3>{user.localidade}</h3>
                        </div>
                    </div>

                    <PerfilConteudo contatos={user.contatos}>
                        Contatos
                    </PerfilConteudo>

                    <PerfilConteudo formacoes={user.formacoes}>
                        Formação Acadêmica
                    </PerfilConteudo>

                    <PerfilConteudo skills={user.skills}>
                        Skills
                    </PerfilConteudo>

                    <div className='botoes'>
                        <Botao tipo='vazio'>
                            <i className="fi fi-setting"></i>
                            Editar
                        </Botao>

                        <Link to='/login'>
                            <Botao tipo='cheio' cor='vermelho'>
                                <i className="fi fi-power-off"></i>
                                Sair
                            </Botao>
                        </Link>
                    </div>

                </div>
            </main>

            <TabMenu tab='perfil' />
        </>
    )
}

export default Perfil;