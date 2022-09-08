import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Header from '../../components/Header/Header';
import Notificacao from '../../components/Notificacao/Notificacao';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Notificacoes.css'

function Notificacoes() {

    const [notificacoes, setNotificacoes] = useState([])

    useEffect(() => {
        let loadNotificacoes = [{
            tipo: 'Vaga Encerrada',
            empresa: 'FIAP',
            cargo: 'Estágio em desenvolvimento',
            descricao: 'O período de candidatura para está vaga foi encerrado, aguarde novas noticias.',
            data: '08/09/2022',
            vista: false,
        }, {
            tipo: 'Aprovado',
            empresa: 'Alura',
            cargo: 'Estágio em desenvolvimento',
            descricao: 'Parabéns! Você foi aprovado para está vaga, veja mais informações na sua candidatura.',
            data: '08/09/2022',
            vista: false
        }, {
            tipo: 'Reprovado',
            empresa: 'IBM',
            cargo: 'Estágio em desenvolvimento',
            descricao: 'Infelizmente você foi reprovado para está vaga! Veja seu feedback na sua candidatura.',
            data: '05/09/2022',
            vista: true
        }, {
            tipo: 'Candidatura Realizada',
            empresa: 'FIAP',
            cargo: 'Estágio em desenvolvimento',
            descricao: 'Sua candidatura foi realizada com sucesso! Aguarde novas noticias.',
            data: '01/09/2022',
            vista: true
        }, {
            tipo: 'Candidatura Realizada',
            empresa: 'Alura',
            cargo: 'Estágio em desenvolvimento',
            descricao: 'Sua candidatura foi realizada com sucesso! Aguarde novas noticias.',
            data: '01/09/2022',
            vista: true
        }, {
            tipo: 'Candidatura Realizada',
            empresa: 'IBM',
            cargo: 'Estágio em desenvolvimento',
            descricao: 'Sua candidatura foi realizada com sucesso! Aguarde novas noticias.',
            data: '01/09/2022',
            vista: true
        }]

        setNotificacoes(loadNotificacoes)
    }, [])

    return (
        <>
            <Header />

            <main className="container">

                <div className='notificacoes'>
                    {
                        notificacoes.map((notificacao, index)=>(
                            <Notificacao dados={notificacao} key={index}/>
                        ))
                    }
                </div>
            </main>

            <TabMenu tab='notificacoes' />
        </>
    )
}

export default Notificacoes;