import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import TabMenu from '../../components/TabMenu/TabMenu';
import CardVaga from '../../components/CardVaga/CardVaga';
import Modal from '../../components/Modal/Modal';
import IMask from 'imask';
import './Vagas.css'
import '../../styles/Logado.css'
import { baseUrl, getUserLogado } from '../../auth/auth';
import Botao from '../../components/Botao/Botao';

function Vagas() {

    const vaga1 = {
        idVaga: 0,
        imgEmpresa: 'https://i.promobit.com.br/268/687551020216058046662025179492.png',
        empresa: 'FIAP',
        dtEncerramento: '09/09/2022',
        salario: 2300.50,
        cargo: 'Estágio em desenvolvimento',
        descricao: 'Antes de tudo, é importante entender que o crescimento organizacional depende da busca por novos talentos. Como funcionário, você é responsável por fornecer oportunidades para que sua organização cresça. Isso significa promover os sucessos de sua equipe para membros novos e existentes.',
        hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
        match: 45
    }

    const userLogado = getUserLogado()
    const [userCandidato, setUserCandidato] = useState(null)
    const [vagas, setVagas] = useState([])
    const [modalFiltroOpen, setModalFiltroOpen] = useState(false)
    const [modalAdicionarOpen, setModalAdicionarOpen] = useState(false)
    const [filtroMatchLevel, setFiltroMatchLevel] = useState(0)

    useEffect(() => {

        let urlBuscarVagas = ''

        if (userLogado.tipo === 'empresa')
            urlBuscarVagas = '/empresa/' + userLogado.id
        else
            buscaPerfil()

        listarVagas(urlBuscarVagas)

    }, [])

    function buscaPerfil() {
        fetch(`${baseUrl()}/candidato/perfil/${userLogado.id}`, {
            method: 'GET'
        })
            .then(async res => {
                if (res.ok) {
                    const json = await res.json()

                    setUserCandidato(json);
                }
                else
                    setUserCandidato(null)
            })
    }

    function listarVagas(urlBuscarVagas) {
        fetch(`${baseUrl()}/vaga${urlBuscarVagas}`, {
            method: 'GET'
        })
            .then(async res => {
                if (res.ok) {
                    let vagas = await res.json()
                    setVagas(vagas)
                }
            })
    }

    function addMascarasFiltro() {
        IMask(document.getElementById('salario-min'), { mask: new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/) })
        IMask(document.getElementById('salario-max'), { mask: new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/) })
    }

    function addMascarasAdicionar() {
        IMask(document.getElementById('salario'), { mask: new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/) })
        IMask(document.getElementById('qtd-vagas'), { mask: new RegExp(/^[0-9]/) })
    }

    function changeRangeOutput(e) {
        setFiltroMatchLevel(e.target.value)
    }

    function adicionarVagaHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = {
            empresa: {
                id: userLogado.id
            },
            cargo: form.querySelector('#cargo').value,
            qtdVagas: form.querySelector('#qtd-vagas').value,
            salario: form.querySelector('#salario').value,
            dataEncerramento: form.querySelector('#dtEncerramento').value.split('-').reverse().join('/'),
            descricao: form.querySelector('#descricao').value,
        }

        fetch(`${baseUrl()}/vaga`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalAdicionarOpen(false)
                    listarVagas('/empresa/' + userLogado.id)
                }
            })
    }

    return (
        <>
            <Header />

            <main className="container">
                {
                    userLogado.tipo === 'candidato'
                        ? <></>/*<i className="fi fi-sliders" onClick={() => { setModalFiltroOpen(true) }}></i>*/
                        : <i className="fi fi-plus" onClick={() => { setModalAdicionarOpen(true) }}></i>
                }

                {/* MODAL DE FILTRO */}
                <Modal isOpen={modalFiltroOpen} setOpen={setModalFiltroOpen} titulo="Filtrar" afterOpen={() => addMascarasFiltro()}>
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
                            <label htmlFor="salario-min">Salário Min</label>
                            <input type="text" className="form__control" placeholder="Salário Min" name="salario-min" id="salario-min" />
                        </div>
                        <div className="form__group col-6 money">
                            <label htmlFor="salario-max">Salário Max</label>
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

                {/* MODAL DE ADICIONAR VAGA */}
                <Modal isOpen={modalAdicionarOpen} setOpen={setModalAdicionarOpen} titulo="Filtrar" afterOpen={() => addMascarasAdicionar()}>
                    <form action="#" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={adicionarVagaHandler}>
                        <div className="form__group col-12 cargo" style={{ marginTop: 0 }}>
                            <label htmlFor="cargo">Cargo</label>
                            <input type="text" required className="form__control" placeholder="Cargo" name="cargo" id="cargo" />
                        </div>
                        <div className="form__group col-6 grupo">
                            <label htmlFor="qtd-vagas">Vagas Dísponiveis</label>
                            <input type="numeric" required className="form__control" placeholder="Vagas Dísponiveis" name="qtd-vagas" id="qtd-vagas" />
                        </div>
                        <div className="form__group col-6 money">
                            <label htmlFor="salario">Salário</label>
                            <input type="numeric" required className="form__control" placeholder="Salário" name="salario" id="salario" />
                        </div>

                        <div className="form__group col-12 data">
                            <label htmlFor="dtEncerramento">Data de Encerramento</label>
                            <input type="date" className="form__control" required name="dtEncerramento" id="dtEncerramento" placeholder="dd/mm/aaaa" />
                        </div>

                        <div className="form__group col-12 mensagem">
                            <label htmlFor="descricao">Descrição</label>
                            <textarea type="area" name="descricao" required id="descricao" className="form__control" placeholder="Descrição" autoComplete="off"></textarea>
                        </div>

                        <div className="botoes">
                            <Botao tipo='vazio' cor='azul'>
                                Adicionar
                            </Botao>
                        </div>
                    </form>
                </Modal>

                <div className="vagas">
                    {
                        vagas.map(vaga => (
                            <CardVaga vaga={vaga} key={vaga.id} candidatoSkills={userCandidato?.skills?.filter(s => s.tipo === 'H')}/>
                        ))
                    }
                </div>
            </main>

            <TabMenu tab='vagas' />
        </>
    )
}

export default Vagas;