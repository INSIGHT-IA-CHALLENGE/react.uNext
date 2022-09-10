import React, { useEffect } from 'react';
import { useState } from 'react';
import CardCandidatura from '../../components/CardCandidatura/CardCandidatura';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Candidaturas.css'

function Candidaturas() {

    const [candidaturas, setCandidaturas] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        let loadCandidaturas = [{
            id: 0,
            imgEmpresa: 'https://yt3.ggpht.com/AO2z0Aojb23jTOCBvaMDj-FGSMPVKldZ3-Y9zMXGuRR9aRpCFI0y2dGTrN0XXaB1ePp3qxSP=s900-c-k-c0x00ffffff-no-rj',
            empresa: 'IBM',
            cargo: 'Estágio em desenvolvimento',
            dtCadastro: '01/09/2022',
            dtEncerramento: '09/09/2022',
            status: 'Reprovado'
        }, {
            id: 1,
            imgEmpresa: 'https://d3q79ipuvy7qd5.cloudfront.net/entities/7ce00c272930b23d464e561b7e99d375/de845e1b08a32902056c0e04d0c469533bbf9af590b2c4abbae62e1aa83f4a55.png',
            empresa: 'Alura',
            cargo: 'Estágio em desenvolvimento',
            dtCadastro: '01/09/2022',
            dtEncerramento: '09/09/2022',
            status: 'Aprovado'
        }, {
            id: 2,
            imgEmpresa: 'https://i.promobit.com.br/268/687551020216058046662025179492.png',
            empresa: 'FIAP',
            cargo: 'Estágio em desenvolvimento',
            dtCadastro: '01/09/2022',
            dtEncerramento: '09/09/2022',
            status: 'Em Andamento'
        }]

        setCandidaturas(loadCandidaturas)
    }, [])

    return (
        <>
            <Header />

            <main className='container'>
                <i className="fi fi-sliders" onClick={()=>setModalOpen(true)}></i>

                <Modal isOpen={modalOpen} setOpen={setModalOpen} titulo="Filtrar" afterOpen={() => {}}>
                    <form action="#" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div className="form__group col-12 busca" style={{ marginTop: 0 }}>
                            <label htmlFor="busca">Pesquisar</label>
                            <input type="text" className="form__control" placeholder="Empresa ou Cargo" name="busca" id="busca" />
                        </div>
                        
                        <div className="form__group col-12">
                            <label htmlFor="skills">Status</label>
                            <select className="form__control" placeholder="Skills" name="skills" id="skills">
                                <option value="">Selecione</option>
                                <option value="Aprovado">Aprovado</option>
                                <option value="Reprovado">Reprovado</option>
                                <option value="Em Andamento">Em Andamento</option>
                            </select>
                        </div>

                        <div className="form__group col-6 data">
                            <label htmlFor="realizada-de">Realizada De</label>
                            <input type="date" className="form__control" name="realizada-de" id="realizada-de"
                                placeholder="dd/mm/aaaa" />
                        </div>
                        <div className="form__group col-6 data">
                            <label htmlFor="realizada-ate">Realizada Até</label>
                            <input type="date" className="form__control" name="realizada-ate" id="realizada-ate"
                                placeholder="dd/mm/aaaa" />
                        </div>
                        
                        <div className="form__group col-6 data">
                            <label htmlFor="encerramento-de">Encerramento De</label>
                            <input type="date" className="form__control" name="encerramento-de" id="encerramento-de"
                                placeholder="dd/mm/aaaa" />
                        </div>
                        <div className="form__group col-6 data">
                            <label htmlFor="encerramento-ate">Encerramento Até</label>
                            <input type="date" className="form__control" name="encerramento-ate" id="encerramento-ate"
                                placeholder="dd/mm/aaaa" />
                        </div>

                        <div className="center">
                            <button type="submit" className="form__control">Filtrar</button>
                        </div>
                    </form>
                </Modal>

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