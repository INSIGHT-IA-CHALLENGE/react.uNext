import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TabMenu from '../../components/TabMenu/TabMenu';
import CardVaga from '../../components/CardVaga/CardVaga';
import Modal from '../../components/Modal/Modal';
import IMask from 'imask';
import './Vagas.css'
import '../../styles/Logado.css'

function Vagas() {

    const vaga1 = {
        idVaga: 0,
        imgEmpresa: 'https://i.promobit.com.br/268/687551020216058046662025179492.png',
        empresa: 'FIAP',
        dtEncerramento: '09/09/2022',
        salario: 2300.50,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 45
    }

    const vaga2 = {
        idVaga: 1,
        imgEmpresa: 'https://yt3.ggpht.com/AO2z0Aojb23jTOCBvaMDj-FGSMPVKldZ3-Y9zMXGuRR9aRpCFI0y2dGTrN0XXaB1ePp3qxSP=s900-c-k-c0x00ffffff-no-rj',
        empresa: 'IBM',
        dtEncerramento: '09/09/2022',
        salario: 3500.99,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 0
    }

    const vaga3 = {
        idVaga: 2,
        imgEmpresa: 'https://d3q79ipuvy7qd5.cloudfront.net/entities/7ce00c272930b23d464e561b7e99d375/de845e1b08a32902056c0e04d0c469533bbf9af590b2c4abbae62e1aa83f4a55.png',
        empresa: 'Alura',
        dtEncerramento: '09/09/2022',
        salario: 1700.00,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 85
    }

    const vaga4 = {
        idVaga: 3,
        imgEmpresa: 'https://dropsdejogos.uai.com.br/wp-content/uploads/sites/10/2019/09/ibm.jpg',
        empresa: 'IBM',
        dtEncerramento: '09/09/2022',
        salario: 3500.99,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 40
    }

    const vaga5 = {
        idVaga: 4,
        imgEmpresa: 'https://i.promobit.com.br/268/687551020216058046662025179492.png',
        empresa: 'Alura',
        dtEncerramento: '09/09/2022',
        salario: 3500.99,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 100
    }

    const vaga6 = {
        idVaga: 5,
        imgEmpresa: 'data:image/png;base64,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',
        empresa: 'Colégio Modulo',
        dtEncerramento: '09/09/2022',
        salario: 2300.50,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 70
    }

    const [vagas, setVagas] = useState([])
    const [modalOpen, setModalOpen] = useState(false)

    const [filtroMatchLevel, setFiltroMatchLevel] = useState(0)

    useEffect(() => {
        let loadVagas = [vaga1, vaga2, vaga3, vaga4, vaga5, vaga6]

        setVagas(loadVagas)
    }, [])

    function addMascaras() {
        IMask(document.getElementById('salario-min'), { mask: new RegExp(/^[0-9]*(\,[0-9]{0,2})?$/) })
        IMask(document.getElementById('salario-max'), { mask: new RegExp(/^[0-9]*(\,[0-9]{0,2})?$/) })
    }

    function changeRangeOutput(e) {
        setFiltroMatchLevel(e.target.value)
    }

    return (
        <>
            <Header />

            <main className="container">
                <i className="fi fi-sliders" onClick={() => { setModalOpen(true) }}></i>

                <Modal isOpen={modalOpen} setOpen={setModalOpen} titulo="Filtrar" afterOpen={() => addMascaras()}>
                    <form action="#" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <div className="form__group col-12 busca" style={{ marginTop: 0 }}>
                            <label htmlFor="busca">Pesquisar</label>
                            <input type="text" className="form__control" placeholder="Empresa, Cargo ou Descrição" name="busca" id="busca" />
                        </div>
                        <div className="form__group col-12 skill">
                            <label htmlFor="skills">Skills (Separe por vírgula)</label>
                            <input type="text" className="form__control" placeholder="Skills" name="skills" id="skills" />
                        </div>
                        <div className="form__group col-6 money">
                            <label htmlFor="skills">Salário Min</label>
                            <input type="text" className="form__control" placeholder="Salário Min" name="salario-min" id="salario-min" />
                        </div>
                        <div className="form__group col-6 money">
                            <label htmlFor="skills">Salário Max</label>
                            <input type="text" className="form__control" placeholder="Salário Max" name="salario-max" id="salario-max" />
                        </div>
                        <div className="form__group col-12">
                            <label htmlFor="skills">Match Leval Mínimo</label>
                            <input type="range" className="form__control" name="match-level" id="match-level" min='0' max='100' defaultValue={filtroMatchLevel} onChange={(e) => changeRangeOutput(e)} />
                            <output className='output__match-level'>{filtroMatchLevel}</output>
                        </div>
                        <div className="form__group col-12">
                            <label htmlFor="skills">Ordenar por</label>
                            <select className="form__control" placeholder="Skills" name="skills" id="skills">
                                <option value="">Selecione</option>
                                <option value="NomeEmpresa ASC">Nome empresa (A-Z)</option>
                                <option value="NomeEmpresa DESC">Nome empresa (Z-A)</option>
                                <option value="Salario ASC">Salário (Min-Max)</option>
                                <option value="Salario DESC">Salário (Max-Min)</option>
                                <option value="MatchLevel ASC">Match Level (Min-Max)</option>
                                <option value="MatchLevel DESC">Match Level (Max-Min)</option>
                            </select>
                        </div>

                        <div className="center">
                            <button type="submit" className="form__control">Filtrar</button>
                        </div>
                    </form>
                </Modal>

                <div className="vagas">
                    {
                        vagas.map(vaga => (
                            <CardVaga vaga={vaga} key={vaga.idVaga} />
                        ))
                    }
                </div>
            </main>

            <TabMenu tab='vagas' />
        </>
    )
}

export default Vagas;