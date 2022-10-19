import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, getUserLogado } from '../../auth/auth';
import Header from '../../components/Header/Header';
import PerfilCandidato from '../../components/PerfilCandidato/PerfilCandidato';
import PerfilEmpresa from '../../components/PerfilEmpresa/PerfilEmpresa';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Perfil.css'

function Perfil() {

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
        skills: [],
        usuario: { login: '' }
    })
    const donoPerfil = (userLogado.id == idUser && userLogado.tipo == tipoUser)

    useEffect(() => {
        atualizaPerfil()
    }, [donoPerfil])

    function atualizaPerfil() {
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
    }

    function mudaFotoPerfil(e) {
        const file = e.target.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {

            let base64 = reader.result
            base64 = base64.replace('data:image/png;base64,', '').replace('data:image/jpeg;base64,', '')

            let json
            if(tipoUser === 'candidato')
                json = JSON.stringify({ urlFoto: base64, idCandidato: idUser })
            else
                json = JSON.stringify({ fotoEmpresa: base64, id: idUser })

            fetch(`${baseUrl()}/${tipoUser}/foto`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: json
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
                        tipoUser === 'candidato'
                            ? <PerfilCandidato
                                userPerfil={userPerfil}
                                donoPerfil={donoPerfil}
                                mudaFotoPerfil={mudaFotoPerfil}
                                atualizaPerfil={atualizaPerfil} />
                            : <PerfilEmpresa
                                userPerfil={userPerfil}
                                donoPerfil={donoPerfil}
                                mudaFotoPerfil={mudaFotoPerfil}
                                atualizaPerfil={atualizaPerfil}/>
                    }

                    {
                        userPerfil == null &&
                        <strong style={{ fontSize: '20px', fontWeight: 900 }}>
                            Usuário não encontrado
                        </strong>
                    }

                </div>
            </main>

            <TabMenu tab='perfil' />
        </>
    )
}

export default Perfil;