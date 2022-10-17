import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, getUserLogado } from '../../auth/auth';
import Botao from '../../components/Botao/Botao';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import TabMenu from '../../components/TabMenu/TabMenu';
import { RemoveItem } from '../Perfil/styled';
import './Vaga.css'

function Vaga() {

    const userLogado = getUserLogado()
    const [userCandidato, setUserCandidato] = useState(null)
    const { idVaga } = useParams()
    const [modalSucessoOpen, setModalSucessoOpen] = useState(false)
    const [modalEditarOpen, setModalEditarOpen] = useState(false)
    const [modalRemoverOpen, setModalRemoverOpen] = useState(false)
    const [modalSkillOpen, setModalSkillOpen] = useState(false)
    const [buscaSkill, setBuscaSkill] = useState('')
    const [vaga, setVaga] = useState(null)
    const [glossary, setGlossary] = useState([])

    useEffect(() => {
        buscarVaga()

        fetch(`${baseUrl()}/skill/glossary`, {
            method: 'GET'
        })
            .then(async res => {
                if (res.ok) {
                    let json = await res.json()
                    setGlossary(json)
                }
            })

        if (userLogado.tipo === 'candidato')
            buscaPerfil()
    }, [])

    useEffect(() => {
        const descricao = document.getElementById('html-descricao')
        if (descricao != null)
            descricao.innerHTML = vaga?.descricao.replaceAll('\n', '<br/>')
    }, [vaga])

    function buscarVaga() {
        fetch(`${baseUrl()}/vaga/${idVaga}`, {
            method: 'GET'
        })
            .then(async res => {
                if (res.ok) {
                    let vaga = await res.json()
                    setVaga(vaga)
                }
            })
    }

    function editarHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = {
            id: idVaga,
            cargo: form.querySelector('#cargo').value,
            qtdVagas: form.querySelector('#qtd-vagas').value,
            salario: form.querySelector('#salario').value,
            dataEncerramento: form.querySelector('#dtEncerramento').value.split('-').reverse().join('/'),
            descricao: form.querySelector('#descricao').value,
        }

        fetch(`${baseUrl()}/vaga`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalEditarOpen(false)
                    buscarVaga()
                }
            })
    }

    function removerHandler() {
        fetch(`${baseUrl()}/vaga/${idVaga}`, {
            method: 'DELETE'
        })
            .then(async res => {
                if (res.ok) {
                    setModalRemoverOpen(false)
                    window.location.replace('/vagas')
                }
            })
    }

    function adicionarSkillHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = {
            id: form.querySelector('#input-hard-skill').value,
            nivel: form.querySelector('#nivel-hard-skill').value,
            tipo: 'H'
        }

        fetch(`${baseUrl()}/vaga/${idVaga}/skill`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalSkillOpen(false)
                    buscarVaga()
                }
            })
    }

    function removerSkillHandler(id) {
        fetch(`${baseUrl()}/vaga/${idVaga}/skill/${id}`, {
            method: 'DELETE'
        })
            .then(async res => {
                if (res.ok) {
                    setModalSkillOpen(false)
                    buscarVaga()
                }
            })
    }

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

    function calcularMatch() {

        const candidatoSkills = userCandidato?.skills
        const vagaSkills = vaga?.skillsDesejadas

        if (vagaSkills?.length > 0) {

            let pontosPossiveis = vagaSkills?.length * 100
            let pontosFeitos = 0

            vagaSkills?.forEach(skill => {
                for (let index = 0; index < candidatoSkills?.length; index++) {

                    if (candidatoSkills[index].id === skill.id) {
                        pontosFeitos += 50

                        if (candidatoSkills[index].nivel >= skill.nivel)
                            pontosFeitos += 50
                    }
                }
            })

            let porcentagem = Math.round((pontosFeitos * 100) / pontosPossiveis)

            if (porcentagem < 0)
                porcentagem = 0
            else if (porcentagem > 100)
                porcentagem = 100


            return porcentagem
        }

        return 100
    }

    function corMatch(match) {
        if (match <= 40) {
            return 'var(--barra3)'

        } else if (match <= 70) {
            return 'var(--barra2)'

        } else {
            return 'var(--barra1)'
        }
    }

    function realizarCandidaturaHandler() {
        const data = {
            candidato: {
                idCandidato: userLogado.id
            },
            vaga: {
                id: idVaga
            }
        }

        fetch(`${baseUrl()}/candidatura`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalSucessoOpen(true)
                    buscarVaga()
                }
            })
    }

    return (
        <>
            <Header />

            <main className="container">
                <div className="vaga">

                    {
                        vaga != null &&
                        <>
                            <div>
                                <img src={`data:image/png;base64,${vaga?.empresa?.fotoEmpresa}`} alt="Logo" />
                                <h1>{vaga?.empresa.nome}</h1>
                            </div>

                            {
                                userLogado.tipo === 'candidato'
                                    ? <p>
                                        <span>Match Level: </span>
                                        <strong style={{ backgroundColor: corMatch(vaga?.match) }}>
                                            {calcularMatch()}%
                                        </strong>
                                    </p>
                                    : <></>
                            }

                            <p>
                                <span>Inscrição até: </span> {vaga.dataEncerramento}
                            </p>

                            <p>
                                <span>Salário: </span> R${vaga.salario.toFixed(2)}
                            </p>

                            <p>
                                <span>Cargo: </span> {vaga.cargo}
                            </p>

                            <p>
                                <span>Hard Skills: </span>
                                {
                                    vaga.skillsDesejadas.map((skill, index) => {
                                        let aux = skill.descricao + ' (' + skill.nivel + ')'

                                        return <React.Fragment key={index}>
                                            {aux}
                                            {
                                                userLogado.tipo === 'empresa' &&
                                                userLogado.id === vaga?.empresa.id &&
                                                <RemoveItem className="centro" onClick={() => removerSkillHandler(skill.id)} style={{ position: 'static', transform: 'translateY(5%)' }}>
                                                    <i className="fi fi-recycle-bin"></i>
                                                </RemoveItem>
                                            }
                                            &emsp;
                                        </React.Fragment>
                                    })
                                }
                                {
                                    vaga.skillsDesejadas.length === 0 ? 'Nenhuma' : ''
                                }
                            </p>

                            <p>
                                <span>Vagas Dísponiveis: </span>{vaga.qtdVagas}
                            </p>

                            <p>
                                <span>Descrição: </span>
                                <br />
                                <span id='html-descricao'></span>
                            </p>
                        </>
                    }

                    {
                        vaga == null &&
                        <strong style={{ fontSize: '20px', fontWeight: 900, textAlign: "center", width: '100%' }}>
                            Vaga não encontrada
                        </strong>
                    }

                    {/* OPCOES CANDIDATO */}
                    {
                        userLogado.tipo === 'candidato' &&
                        vaga !== null &&
                        <div className="botoes">
                            {
                                vaga?.candidaturas?.filter(c => c.candidato.idCandidato === userLogado.id) < 1
                                    ? <Botao tipo='cheio' cor='azul' onClick={realizarCandidaturaHandler}>
                                        Me Candidatar
                                    </Botao>
                                    : <Botao tipo='cheio' cor='cinza' onClick={() => {}}>
                                        Já Inscrito
                                    </Botao>
                            }

                            <Modal isOpen={modalSucessoOpen} setOpen={setModalSucessoOpen} titulo="Sucesso">
                                <i className="fi fi-check-mark-circle candidatura-realizada-check"></i>
                                <span>Candidaduta realizada!</span>
                            </Modal>
                        </div>
                    }

                    {/* OPCOES EMPRESA */}
                    {
                        userLogado.tipo === 'empresa' &&
                        userLogado.id === vaga?.empresa.id &&
                        <div className="botoes">

                            {
                                glossary.length > 0 &&
                                <Botao tipo='vazio' cor='azul' onClick={() => setModalSkillOpen(true)}>
                                    <i className="fi fi-plus-square"></i>
                                    Skill
                                </Botao>
                            }

                            <Botao tipo='vazio' onClick={() => setModalEditarOpen(true)}>
                                <i className="fi fi-setting"></i>
                                Editar
                            </Botao>

                            <Botao tipo='cheio' cor='vermelho' onClick={() => setModalRemoverOpen(true)}>
                                <i className="fi fi-close"></i>
                                Remover
                            </Botao>


                            {/* EDITAR VAGA */}
                            <Modal isOpen={modalEditarOpen} setOpen={setModalEditarOpen} titulo="Editar Vaga" afterOpen={() => { }}>
                                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={editarHandler}>

                                    <div className="form__group col-12 cargo" style={{ marginTop: 0 }}>
                                        <label htmlFor="cargo">Cargo</label>
                                        <input type="text" required className="form__control" placeholder="Cargo" name="cargo" id="cargo" defaultValue={vaga?.cargo} />
                                    </div>
                                    <div className="form__group col-6 grupo">
                                        <label htmlFor="qtd-vagas">Vagas Dísponiveis</label>
                                        <input type="numeric" required className="form__control" placeholder="Vagas Dísponiveis" name="qtd-vagas" id="qtd-vagas" defaultValue={vaga?.qtdVagas} />
                                    </div>
                                    <div className="form__group col-6 money">
                                        <label htmlFor="salario">Salário</label>
                                        <input type="numeric" required className="form__control" placeholder="Salário" name="salario" id="salario" defaultValue={vaga?.salario.toFixed(2)} />
                                    </div>

                                    <div className="form__group col-12 data">
                                        <label htmlFor="dtEncerramento">Data de Encerramento</label>
                                        <input type="date" className="form__control" required name="dtEncerramento" id="dtEncerramento" placeholder="dd/mm/aaaa"
                                            defaultValue={vaga?.dataEncerramento.split('/').reverse().join('-')} />
                                    </div>

                                    <div className="form__group col-12 mensagem">
                                        <label htmlFor="descricao">Descrição</label>
                                        <textarea type="area" name="descricao" required id="descricao" className="form__control" placeholder="Descrição" autoComplete="off"
                                            defaultValue={vaga?.descricao}></textarea>
                                    </div>


                                    <div className="botoes">
                                        <Botao tipo='vazio' cor='azul'>
                                            Atualizar
                                        </Botao>
                                    </div>
                                </form>
                            </Modal>

                            {/* REMOVER VAGA */}
                            <Modal isOpen={modalRemoverOpen} setOpen={setModalRemoverOpen} titulo="Confirmação" afterOpen={() => { }}>
                                <span>Deseja realmente remover a vaga? Essa ação é permanente e não será possível acessar as candidaturas da vaga mais.</span>
                                <div className="botoes">
                                    <Botao tipo='vazio' cor='vermelho' onClick={removerHandler}>
                                        Confirmar
                                    </Botao>
                                </div>
                            </Modal>

                            {/* MODAL DE ADICIONAR SKILL */}
                            <Modal isOpen={modalSkillOpen} setOpen={setModalSkillOpen} titulo="Adicionar Skill" afterOpen={() => { }}>
                                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={adicionarSkillHandler}>

                                    <div id='secao-hard-skill' style={{ width: '100%' }}>
                                        <div className="form__group col-12 busca" id='div-busca-hard-skill'>
                                            <label htmlFor="busca-hard-skill">Buscar Hard Skill</label>
                                            <input type="text" className="form__control" placeholder="Hard Skill" name="busca-hard-skill" id="busca-hard-skill"
                                                onChange={(e) => setBuscaSkill(e.target.value)} />
                                        </div>

                                        <div className="form__group col-12" id='div-hard-skill'>
                                            <label htmlFor="input-hard-skill">Selecionar Hard Skill</label>

                                            <select className="form__control" required name="input-hard-skill" id="input-hard-skill">
                                                {
                                                    glossary.filter(skill => skill.descricao.toLowerCase().includes(buscaSkill.toLowerCase())).map(skill => (
                                                        <option value={skill.id} key={skill.id}>{skill.descricao}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        <div className="form__group col-12">
                                            <label htmlFor="nivel-hard-skill">Nível da Hard Skill</label>

                                            <select className="form__control" required name='nivel-hard-skill' id='nivel-hard-skill'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="botoes">
                                        <Botao tipo='vazio' cor='azul'>
                                            Cadastrar
                                        </Botao>
                                    </div>

                                </form>
                            </Modal>
                        </div>
                    }

                </div>
            </main>

            <TabMenu />
        </>
    )
}

export default Vaga;