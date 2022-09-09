import React, { useEffect } from 'react';
import { useState } from 'react';
import CardCandidatura from '../../components/CardCandidatura/CardCandidatura';
import Header from '../../components/Header/Header';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Candidaturas.css'

function Candidaturas() {

    const [candidaturas, setCandidaturas] = useState([])

    useEffect(() => {
        let loadCandidaturas = [{
            id: 0,
            imgEmpresa: 'https://yt3.ggpht.com/AO2z0Aojb23jTOCBvaMDj-FGSMPVKldZ3-Y9zMXGuRR9aRpCFI0y2dGTrN0XXaB1ePp3qxSP=s900-c-k-c0x00ffffff-no-rj',
            empresa: 'IBM',
            cargo: 'Estágio em desenvolvimento',
            dtEncerramento: '09/09/2022',
            status: 'Reprovado'
        }, {
            id: 1,
            imgEmpresa: 'https://d3q79ipuvy7qd5.cloudfront.net/entities/7ce00c272930b23d464e561b7e99d375/de845e1b08a32902056c0e04d0c469533bbf9af590b2c4abbae62e1aa83f4a55.png',
            empresa: 'Alura',
            cargo: 'Estágio em desenvolvimento',
            dtEncerramento: '09/09/2022',
            status: 'Aprovado'
        }, {
            id: 2,
            imgEmpresa: 'https://i.promobit.com.br/268/687551020216058046662025179492.png',
            empresa: 'FIAP',
            cargo: 'Estágio em desenvolvimento',
            dtEncerramento: '09/09/2022',
            status: 'Em Andamento'
        }]

        setCandidaturas(loadCandidaturas)
    }, [])

    return (
        <>
            <Header />

            <main className='container'>
                <i className="fi fi-sliders"></i>

                <div className='candidaturas'>
                    {
                        candidaturas.map(candidatura => (
                            <CardCandidatura dados={candidatura} key={candidatura.id} />
                        ))
                    }
                </div>
            </main>

            <TabMenu tab='candidaturas' />
        </>
    )
}

export default Candidaturas;