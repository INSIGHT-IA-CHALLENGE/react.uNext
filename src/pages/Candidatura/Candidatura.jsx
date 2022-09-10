import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Candidatura.css'

function Candidatura() {

    const [modalOpen, setModalOpen] = useState(false)
    const [candidatura, setCandidatura] = useState({
        idCandidatura: 5,
        imgEmpresa: 'https://d3q79ipuvy7qd5.cloudfront.net/entities/7ce00c272930b23d464e561b7e99d375/de845e1b08a32902056c0e04d0c469533bbf9af590b2c4abbae62e1aa83f4a55.png',
        empresa: 'Alura',
        dtEncerramento: '09/09/2022',
        salario: 1700,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        candidaturas: 2,
        match: 80,
        dtCadastro: '01/09/2022',
        status: 'Aprovado',
        feedback: `Adoramos seu perfil! \n\n Enviaremos um email para você em breve.`
    })

    function corMatch(match) {
        if (match <= 40) {
            return 'var(--barra3)'

        } else if (match <= 70) {
            return 'var(--barra2)'

        } else {
            return 'var(--barra1)'
        }
    }

    return (
        <>
            <Header />

            <main className='container'>

                <div className="candidatura">

                    <h1 className="candidatura__title-section">Vaga</h1>
                    <div className="vaga__infos">

                        <div>
                            <img src={candidatura.imgEmpresa} alt="Logo" />
                            <h1>{candidatura.empresa}</h1>
                        </div>

                        <p>
                            <span>Match Level: </span>
                            <strong style={{ backgroundColor: corMatch(candidatura.match) }}>
                                {candidatura.match}%
                            </strong>
                        </p>

                        <p>
                            <span>Inscrição até: </span> {candidatura.dtEncerramento}
                        </p>

                        <p>
                            <span>Salário: </span> R${candidatura.salario.toFixed(2)}
                        </p>

                        <p>
                            <span>Cargo: </span> {candidatura.cargo}
                        </p>

                        <p>
                            <span>Hard Skills: </span>
                            {
                                candidatura.hardSkills.map((skill, index) => {
                                    let aux = skill + ', '
                                    if (index + 1 === candidatura.hardSkills.length)
                                        aux = aux.replace(',', '')

                                    return aux
                                })
                            }
                        </p>

                        <p>
                            <span>Vagas Dísponiveis: </span>{candidatura.candidaturas}
                        </p>

                        <p>
                            <span>Descrição: </span>{candidatura.descricao}
                        </p>


                    </div>

                    <h1 className="candidatura__title-section">Candidatura</h1>
                    <div className="candidatura__dados">
                        <p>
                            <span>Status: </span>
                            <strong className={`status ${candidatura.status.toLowerCase().replace(' ', '_')}`}>
                                {candidatura.status}
                            </strong>
                        </p>

                        <p>
                            <span>Data da Candidatura: </span>{candidatura.dtCadastro}
                        </p>

                        <p>
                            <span>Feedback: </span>{candidatura.feedback}
                        </p>
                    </div>
                    <div className="botoes">
                        <Link to="/candidaturas">
                            <Botao tipo='vazio'>Voltar</Botao>
                        </Link>
                        
                        <Botao tipo='cheio' cor='vermelho' onClick={() => setModalOpen(true)}>
                            <i className="fi fi-recycle-bin"></i>
                            Cancelar
                        </Botao>

                        <Modal isOpen={modalOpen} setOpen={setModalOpen} titulo="Confirmação" afterOpen={() => { }}>
                            <span>Deseja realmente cancelar sua canditura?</span>
                            <div className="botoes">
                                <Link to='/login'>
                                    <Botao tipo='vazio' cor='vermelho' onClick={() => setModalOpen(true)}>
                                        Confirmar
                                    </Botao>
                                </Link>
                            </div>
                        </Modal>

                    </div>
                </div>
            </main>

            <TabMenu />
        </>
    )
}

export default Candidatura;