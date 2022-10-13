import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { baseUrl, deslogar, getUserLogado, userLogado, validaLogin } from '../../auth/auth';
import Botao from '../../components/Botao/Botao';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import PerfilConteudo from '../../components/PerfilConteudo/PerfilConteudo';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Perfil.css'

function Perfil() {

    const AddFoto = styled.label`
        background: none;
        border: none;
        position: absolute;
        bottom: 5px;
        right: 5px;

        & > i {
            font-size: 30px;
            color: var(--cinza5);
            cursor: pointer;
            background-color: var(--cinza1);
            border-radius: 60px;
        }
    `

    const [foto, setFoto] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const userLogado = getUserLogado()
    const { tipoUser, idUser } = useParams('id')
    const [userPerfil, setUserPerfil] = useState({
        urlFoto: null,
        nome: '',
        dataNascimento: '',
        escolaridade: '',
        atuacao: '',
        endereco: '',
        contatos: [],
        formacoesAcademicas: [],
        skills: []
    })
    const donoPerfil = (userLogado.id == idUser && userLogado.tipo == tipoUser)

    useEffect(() => {
        if (!validaLogin())
            window.location.replace('/login')

        fetch(`${baseUrl()}/${tipoUser}/perfil/${idUser}`, {
            method: 'GET'
        })
            .then(async res => {
                if (res.ok) {
                    const json = await res.json()

                    setUserPerfil(json);
                }
                else
                    setUserPerfil(null)
            })
    }, [donoPerfil])

    function mudaFotoPerfil(e) {
        const file = e.target.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {

            let base64 = reader.result
            base64 = base64.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '')

            fetch(`${baseUrl()}/${tipoUser}/${idUser}/foto`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ foto: base64 })
            })
                .then(res => {
                    if (res.ok) {
                        document.getElementById('ft-perfil').src = `data:image/png;base64,${base64}`
                    }
                })

        }.bind(this)
    }

    return (
        <>
            <Header />

            <main className="container">

                <div className="perfil">

                    {
                        userPerfil !== null &&
                        <>
                            <div className="perfil__header">
                                <div className='foto'>
                                    <img src={userPerfil.urlFoto ? `data:image/png;base64,${userPerfil.urlFoto}` : '/images/user.png'} alt="Foto User" id='ft-perfil' />
                                    {
                                        donoPerfil &&
                                        <>
                                            <input type="file" id='input-add-foto' accept="image/png, image/jpeg" onChange={mudaFotoPerfil} />
                                            <AddFoto htmlFor='input-add-foto'><i className="fi fi-plus-round"></i></AddFoto>
                                        </>
                                    }
                                </div>


                                <div>
                                    <h1>{userPerfil.nome}</h1>
                                    <h3>{userPerfil.dataNascimento}</h3>
                                    <h3>{userPerfil.escolaridade}</h3>
                                    <h3>{userPerfil.atuacao ?? ''}</h3>
                                    <h3>{userPerfil.endereco.cidade}</h3>
                                </div>
                            </div>

                            <PerfilConteudo contatos={userPerfil.contatos}>
                                Contatos
                            </PerfilConteudo>

                            <PerfilConteudo formacoes={userPerfil.formacoes}>
                                Formação Acadêmica
                            </PerfilConteudo>

                            <PerfilConteudo skills={userPerfil.skills}>
                                Skills
                            </PerfilConteudo>
                        </>
                    }

                    {
                        userPerfil == null &&
                        <strong style={{ fontSize: '20px', fontWeight: 900 }}>
                            Usuário não encontrado
                        </strong>
                    }

                    {
                        donoPerfil &&
                        <div className='botoes'>
                            <Botao tipo='vazio'>
                                <i className="fi fi-setting"></i>
                                Editar
                            </Botao>

                            <Botao tipo='cheio' cor='vermelho' onClick={() => setModalOpen(true)}>
                                <i className="fi fi-power-off"></i>
                                Sair
                            </Botao>

                            <Modal isOpen={modalOpen} setOpen={setModalOpen} titulo="Confirmação" afterOpen={() => { }}>
                                <span>Deseja realmente sair da sua conta?</span>
                                <div className="botoes">
                                    <Link to='/login'>
                                        <Botao tipo='vazio' cor='vermelho' onClick={() => { setModalOpen(true); deslogar(); }}>
                                            Confirmar
                                        </Botao>
                                    </Link>
                                </div>
                            </Modal>
                        </div>
                    }

                </div>


            </main>

            <TabMenu tab='perfil' />
        </>
    )
}

export default Perfil;