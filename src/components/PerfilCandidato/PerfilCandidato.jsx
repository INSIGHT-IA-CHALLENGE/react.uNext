import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl, deslogar } from '../../auth/auth';
import { AddFoto, AddItem } from '../../pages/Perfil/styled';
import Botao from '../Botao/Botao';
import Modal from '../Modal/Modal';
import PerfilConteudo from '../PerfilConteudo/PerfilConteudo';
import IMask from 'imask';
import { useEffect } from 'react';

function PerfilCandidato(props) {

    const [modalSairOpen, setModalSairOpen] = useState(false)
    const [modalEditarOpen, setModalEditarOpen] = useState(false)
    const [modalContatoOpen, setModalContatoOpen] = useState(false)
    const [modalFormacaoOpen, setModalFormacaoOpen] = useState(false)
    const [modalSkillOpen, setModalSkillOpen] = useState(false)
    const [glossary, setGlossary] = useState([])

    useEffect(() => {
        fetch(`${baseUrl()}/skill/glossary`, {
            method: 'GET'
        })
            .then(async res => {
                if (res.ok) {
                    let json = await res.json()
                    setGlossary(json)
                }
            })
    }, [])



    //ATUALIZAR PERFIL
    const [sexo, setSexo] = useState(props.userPerfil?.sexo)

    useEffect(() => {
        setSexo(props.userPerfil.sexo ?? 'M')
    }, [modalEditarOpen])

    function pesquisacep(valor) {
        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep !== "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('rua').value = "...";
                document.getElementById('bairro').value = "...";
                document.getElementById('cidade').value = "...";
                document.getElementById('uf').value = "...";

                //Url do via cep
                let url = 'https://viacep.com.br/ws/' + cep + '/json';

                //Requisição para a API
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => {
                        insereRetornoCep(json)
                    })
                    .catch(() => {
                        limpaEndereco()
                    })

            } //end if.
            else {
                //cep é inválido.
                limpaEndereco();
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpaEndereco();
        }
    }

    function insereRetornoCep(conteudo) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro) ?? '';
        document.getElementById('bairro').value = (conteudo.bairro) ?? '';
        document.getElementById('cidade').value = (conteudo.localidade) ?? '';
        document.getElementById('uf').value = (conteudo.uf) ?? '';
    }

    function limpaEndereco() {
        document.getElementById('rua').value = null;
        document.getElementById('bairro').value = null;
        document.getElementById('cidade').value = null;
        document.getElementById('uf').value = null;
        document.getElementById('numero').value = null;
        document.getElementById('referencia').value = null;
    }

    function getDadosCandidato(form) {
        let data = {
            idPessoa: props.userPerfil.idPessoa,
            idCandidato: props.userPerfil.idCandidato,
            nome: form.querySelector('#nome').value,
            rg: form.querySelector('#rg').value,
            cpf: form.querySelector('#cpf').value,
            dataNascimento: form.querySelector('#dtNascimento').value.split('-').reverse().join('/'),
            sexo: sexo,
            escolaridade: form.querySelector('#escolaridade').value,
            atuacao: form.querySelector('#ocupacao').value,
            usuario: {
                id: props.userPerfil.usuario.id,
                senha: form.querySelector('#nova-senha').value == ''
                    ? props.userPerfil.usuario.senha
                    : form.querySelector('#nova-senha').value
            },
            endereco: {
                idEnderaco: props.userPerfil.endereco.idEnderaco,
                logradouro: form.querySelector('#rua').value,
                numero: form.querySelector('#numero').value,
                complemento: form.querySelector('#referencia').value,
                bairro: form.querySelector('#bairro').value,
                cidade: form.querySelector('#cidade').value,
                uf: form.querySelector('#uf').value,
                cep: form.querySelector('#cep').value,
            }
        }

        return data
    }

    function atualizaCandidatoHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = getDadosCandidato(form)

        fetch(`${baseUrl()}/candidato/perfil/${props.userPerfil.idCandidato}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalEditarOpen(false)
                    props.atualizaPerfil()
                }
            })
    }



    //CRUD  CONTATO
    const [tipoContato, setTipoContato] = useState("email")

    useEffect(() => {
        if (!modalContatoOpen)
            setTipoContato('email')
    }, [modalContatoOpen])

    function trocarTipoContato(e) {
        const inputEmail = document.getElementById('input-email')
        const inputTelefone = document.getElementById('input-telefone')

        const novoTipo = e.target.value
        inputEmail.value = ''
        inputTelefone.value = ''

        if (novoTipo === 'telefone') {
            IMask(inputTelefone, { mask: '(00) 0000-00000' })
            document.getElementById('div-telefone').style.display = 'flex'
            inputTelefone.disabled = false;

            document.getElementById('div-email').style.display = 'none'
            inputEmail.disabled = true;
        }
        else {
            document.getElementById('div-email').style.display = 'flex'
            inputEmail.disabled = false;

            document.getElementById('div-telefone').style.display = 'none'
            inputTelefone.disabled = true;
        }

        setTipoContato(novoTipo)
    }

    function adicionarContatoHandler(e) {
        e.preventDefault()

        const data = {
            email: tipoContato === 'email' ? document.getElementById('input-email').value : null,
            telefone: tipoContato === 'telefone' ? document.getElementById('input-telefone').value : null,
        }

        fetch(`${baseUrl()}/candidato/${props.userPerfil.idCandidato}/contato`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalContatoOpen(false)
                    props.atualizaPerfil()
                }
            })
    }

    function removerContatoHandler(id) {
        fetch(`${baseUrl()}/candidato/contato/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    props.atualizaPerfil()
                }
            })
    }



    //CRUD FORMACAO
    function adicionarFormacaoHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = {
            curso: form.querySelector('#nome-curso').value,
            grauAcademico: form.querySelector('#grau-formacao').value,
            instituicao: form.querySelector('#nome-instituicao').value,
            dataInicio: form.querySelector('#dtInicio').value.split('-').reverse().join('/'),
            dataFim: form.querySelector('#dtFim').value.split('-').reverse().join('/')
        }

        fetch(`${baseUrl()}/candidato/${props.userPerfil.idCandidato}/formacao`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalFormacaoOpen(false)
                    props.atualizaPerfil()
                }
            })
    }

    function removerFormacaoHandler(id) {
        fetch(`${baseUrl()}/candidato/formacao/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    props.atualizaPerfil()
                }
            })
    }



    //CRUD SKILL
    const [tipoSkill, setTipoSkill] = useState("hard")
    const [buscaSkill, setBuscaSkill] = useState('')

    useEffect(() => {
        if (!modalContatoOpen) {
            setTipoContato('hard')
            setBuscaSkill('')
        }
    }, [tipoSkill])

    function trocarTipoSkill(e) {
        const secaoHardSkill = document.getElementById('secao-hard-skill')
        const secaoSoftSkill = document.getElementById('secao-soft-skill')

        const novoTipo = e.target.value

        if (novoTipo === 'hard') {
            secaoHardSkill.style.display = 'block'
            secaoSoftSkill.style.display = 'none'
            document.getElementById('input-soft-skill').disabled = true
        }
        else {
            secaoSoftSkill.style.display = 'block'
            secaoHardSkill.style.display = 'none'
            document.getElementById('input-soft-skill').disabled = false
        }

        setTipoSkill(novoTipo)
    }

    function adicionarSkillHandler(e) {
        e.preventDefault()
        const form = e.target

        let data = {}

        if (tipoSkill === 'hard') {
            data = {
                id: form.querySelector('#input-hard-skill').value,
                nivel: form.querySelector('#nivel-hard-skill').value,
                tipo: 'H'
            }
        }
        else {
            data = {
                descricao: form.querySelector('#input-soft-skill').value,
                tipo: 'S'
            }
        }

        fetch(`${baseUrl()}/candidato/${props.userPerfil.idCandidato}/skill`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalSkillOpen(false)
                    props.atualizaPerfil()
                }
            })
    }

    function removerSkillHandler(id) {
        fetch(`${baseUrl()}/candidato/skill/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    props.atualizaPerfil()
                }
            })
    }



    return (
        <>
            {
                props.userPerfil !== null &&
                <>
                    <div className="perfil__header">
                        <div className='foto'>
                            <img src={props.userPerfil.urlFoto ? `data:image/png;base64,${props.userPerfil.urlFoto}` : '/images/user.png'} alt="Foto User" id='ft-perfil' />
                            {
                                props.donoPerfil &&
                                <>
                                    <input type="file" id='input-add-foto' accept="image/png, image/jpeg" onChange={props.mudaFotoPerfil} />
                                    <AddFoto htmlFor='input-add-foto'><i className="fi fi-plus-round"></i></AddFoto>
                                </>
                            }
                        </div>


                        <div>
                            <h1>{props.userPerfil.nome}</h1>
                            <h3>{props.userPerfil.dataNascimento}</h3>
                            <h3>{props.userPerfil.escolaridade}</h3>
                            <h3>{props.userPerfil.atuacao ?? ''}</h3>
                            <h3>{props.userPerfil.endereco.cidade}</h3>
                        </div>
                    </div>

                    <PerfilConteudo contatos={props.userPerfil.contatos} titulo={"Contatos"} userPerfil={props.userPerfil} donoPerfil={props.donoPerfil} remover={removerContatoHandler}>
                        {
                            props.donoPerfil &&
                            <AddItem onClick={() => setModalContatoOpen(true)}>
                                <i className="fi fi-plus-square"></i>
                            </AddItem>
                        }
                    </PerfilConteudo>

                    <PerfilConteudo formacoes={props.userPerfil.formacoesAcademicas} titulo={"Formação Acadêmica"} donoPerfil={props.donoPerfil} remover={removerFormacaoHandler}>
                        {
                            props.donoPerfil &&
                            <AddItem onClick={() => setModalFormacaoOpen(true)}>
                                <i className="fi fi-plus-square"></i>
                            </AddItem>
                        }
                    </PerfilConteudo>

                    <PerfilConteudo skills={props.userPerfil.skills} titulo={"Skills"} donoPerfil={props.donoPerfil} remover={removerSkillHandler}>
                        {
                            props.donoPerfil &&
                            glossary.length > 0 &&
                            <AddItem onClick={() => setModalSkillOpen(true)}>
                                <i className="fi fi-plus-square"></i>
                            </AddItem>
                        }
                    </PerfilConteudo>
                </>
            }

            {
                props.donoPerfil &&
                <div className='botoes'>
                    <Botao tipo='vazio' onClick={() => setModalEditarOpen(true)}>
                        <i className="fi fi-setting"></i>
                        Editar
                    </Botao>

                    <Botao tipo='cheio' cor='vermelho' onClick={() => setModalSairOpen(true)}>
                        <i className="fi fi-power-off"></i>
                        Sair
                    </Botao>
                </div>
            }

            {/* MODAL SAIR */}
            <Modal isOpen={modalSairOpen} setOpen={setModalSairOpen} titulo="Confirmação" afterOpen={() => { }}>
                <span>Deseja realmente sair da sua conta?</span>
                <div className="botoes">
                    <Link to='/login'>
                        <Botao tipo='vazio' cor='vermelho' onClick={() => deslogar()}>
                            Confirmar
                        </Botao>
                    </Link>
                </div>
            </Modal>

            {/* MODAL EDITAR PERFIl */}
            <Modal isOpen={modalEditarOpen} setOpen={setModalEditarOpen} titulo="Editar Perfil" afterOpen={() => { }}>
                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={atualizaCandidatoHandler}>
                    <div className="form__group col-12 nome" style={{ marginTop: 0 }}>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form__control" placeholder="Nome Completo" required name="nome" id="nome" defaultValue={props.userPerfil?.nome} />
                    </div>

                    <div className="form__group col-12 documento">
                        <label htmlFor="cpf">CPF</label>
                        <input type="numeric" className="form__control" placeholder="CPF" required name="cpf" id="cpf" maxLength={14}
                            onChange={(e) => { IMask(e.target, { mask: '000.000.000-00' }) }} defaultValue={props.userPerfil?.cpf} />
                    </div>

                    <div className="form__group col-12 documento">
                        <label htmlFor="rg">RG</label>
                        <input type="numeric" className="form__control" placeholder="RG" required name="rg" id="rg" maxLength={12} defaultValue={props.userPerfil?.rg} />
                    </div>

                    <div className="form__group col-6">
                        <label>Sexo</label>

                        <div className="radio__group">
                            <div>
                                <input type="radio" name="sexo" id="masculino" defaultChecked={props.userPerfil?.sexo === 'M'} required onClick={() => setSexo('M')} />
                                <label htmlFor="masculino">Masculino</label>
                            </div>

                            <div>
                                <input type="radio" name="sexo" id="feminino" defaultChecked={props.userPerfil?.sexo === 'F'} onClick={() => setSexo('F')} />
                                <label htmlFor="feminino">Feminino</label>
                            </div>
                        </div>
                    </div>

                    <div className="form__group col-12">
                        <label htmlFor="cpf">Escolaridade</label>

                        <select className="form__control" required name='escolaridade' id='escolaridade' defaultValue={props.userPerfil?.escolaridade}>
                            <option value="Fundamental Completo">Fundamental Completo</option>
                            <option value="Médio Incompleto">Médio Incompleto</option>
                            <option value="Médio Completo">Médio Completo</option>
                            <option value="Superior Incompleto">Superior Incompleto</option>
                            <option value="Superior Completo">Superior Completo</option>
                        </select>
                    </div>

                    <div className="form__group col-12 documento">
                        <label htmlFor="ocupacao">Ocupação Atual</label>
                        <input type="text" className="form__control" placeholder="Ocupação Atual" name="ocupacao" id="ocupacao" defaultValue={props.userPerfil?.atuacao} />
                    </div>

                    <div className="form__group col-12 data">
                        <label htmlFor="cpf">Data de Nascimento</label>
                        <input type="date" className="form__control" required name="dtNascimento" id="dtNascimento"
                            placeholder="dd/mm/aaaa" defaultValue={props.userPerfil?.dataNascimento.split('/').reverse().join('-')} />
                    </div>

                    <div className="form__group col-6 endereco">
                        <label htmlFor="cep">CEP</label>
                        <input type="numeric" className="form__control" placeholder="00000-000" required name="cep" id="cep" defaultValue={props.userPerfil?.endereco.cep}
                            onChange={(e) => {
                                IMask(e.target, { mask: '00000-000' })
                                let cep = e.target.value

                                if (cep.length === 9)
                                    pesquisacep(cep)
                            }}
                        />
                    </div>

                    <div className="form__group col-6 endereco">
                        <label htmlFor="uf">UF</label>
                        <input type="text" className="form__control" placeholder="UF" required name="uf" id="uf" readOnly defaultValue={props.userPerfil?.endereco.uf} />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="rua">Rua</label>
                        <input type="text" className="form__control" placeholder="Rua" required name="logradouro" id="rua" defaultValue={props.userPerfil?.endereco.logradouro}
                            readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form__control" placeholder="Bairro" required name="bairro" id="bairro" defaultValue={props.userPerfil?.endereco.bairro}
                            readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form__control" placeholder="Cidade" required name="cidade" id="cidade" defaultValue={props.userPerfil?.endereco.cidade}
                            readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="referencia">Ponto de Referência</label>
                        <input type="text" className="form__control" placeholder="Ponto de Referência" name="referencia" defaultValue={props.userPerfil?.endereco.complemento}
                            id="referencia" />
                    </div>

                    <div className="form__group col-6 endereco">
                        <label htmlFor="numero">Número</label>
                        <input type="numeric" className="form__control" placeholder="Número" required name="numero" id="numero" maxLength={9} defaultValue={props.userPerfil?.endereco.numero}
                            onChange={(e) => {
                                IMask(e.target, { mask: new RegExp(/^[0-9]*$/) })
                            }} />
                    </div>

                    <div className="form__group col-12 email">
                        <label htmlFor="email">Seu Login</label>
                        <input type="email" className="form__control" placeholder="Email" required name="email" id="email" readOnly
                            defaultValue={props.userPerfil?.usuario.login} />
                    </div>

                    <div className="form__group col-12 senha">
                        <label htmlFor="senha">Nova Senha</label>
                        <input type="password" className="form__control" placeholder="Nova Senha" name="nova-senha" id="nova-senha" minLength={5} />
                    </div>

                    <div className="botoes">
                        <Botao tipo='vazio' cor='azul'>
                            Atualizar
                        </Botao>
                    </div>
                </form>
            </Modal>

            {/* MODAL DE ADICIONAR CONTATO */}
            <Modal isOpen={modalContatoOpen} setOpen={setModalContatoOpen} titulo="Adicionar Contato" afterOpen={() => { }}>
                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={adicionarContatoHandler}>

                    <div className="radio__group">
                        <div>
                            <input type="radio" name="tipoCadastro" value="email" id="radio-email" required defaultChecked onClick={trocarTipoContato} />
                            <label htmlFor="radio-email">Email</label>
                        </div>

                        <div>
                            <input type="radio" name="tipoCadastro" value="telefone" id="radio-telefone" onClick={trocarTipoContato} />
                            <label htmlFor="radio-telefone">Telefone</label>
                        </div>
                    </div>

                    <div className="form__group col-12 email" id='div-email'>
                        <label htmlFor="input-email">Email</label>
                        <input type="email" className="form__control" placeholder="Email" required name="input-email" id="input-email" />
                    </div>

                    <div className="form__group col-12 contato" style={{ display: 'none' }} id='div-telefone'>
                        <label htmlFor="input-telefone">Telefone</label>
                        <input type="text" className="form__control" placeholder="Telefone" required name="input-telefone" id="input-telefone" minLength={14} disabled />
                    </div>

                    <div className="botoes">
                        <Botao tipo='vazio' cor='azul'>
                            Cadastrar
                        </Botao>
                    </div>

                </form>
            </Modal>

            {/* MODAL DE ADICIONAR FORMACAO */}
            <Modal isOpen={modalFormacaoOpen} setOpen={setModalFormacaoOpen} titulo="Adicionar Formação" afterOpen={() => { }}>
                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={adicionarFormacaoHandler}>

                    <div className="form__group col-12" style={{ marginTop: 0 }}>
                        <label htmlFor="grau-formacao">Grau de formação</label>

                        <select className="form__control" required name='grau-formacao' id='grau-formacao'>
                            <option value="Técnico">Técnico</option>
                            <option value="Tecnólogo">Tecnólogo</option>
                            <option value="Licenciatura">Licenciatura</option>
                            <option value="Bacharelado">Bacharelado</option>
                        </select>
                    </div>

                    <div className="form__group col-12 empresa">
                        <label htmlFor="nome-curso">Nome do Curso</label>
                        <input type="text" className="form__control" placeholder="Nome do Curso" name="nome-curso" id="nome-curso" required />
                    </div>

                    <div className="form__group col-12 empresa">
                        <label htmlFor="nome-instituicao">Nome da Instituição</label>
                        <input type="text" className="form__control" placeholder="Nome da Instituição" name="nome-instituicao" id="nome-instituicao" required />
                    </div>

                    <div className="form__group col-12 data">
                        <label htmlFor="dtInicio">Data de Início</label>
                        <input type="date" className="form__control" required name="dtInicio" id="dtInicio"
                            placeholder="dd/mm/yyyy" />
                    </div>

                    <div className="form__group col-12 data">
                        <label htmlFor="dtFim">Data de Fim</label>
                        <input type="date" className="form__control" required name="dtFim" id="dtFim"
                            placeholder="dd/mm/aaaa" />
                    </div>

                    <div className="botoes">
                        <Botao tipo='vazio' cor='azul'>
                            Cadastrar
                        </Botao>
                    </div>

                </form>
            </Modal>

            {/* MODAL DE ADICIONAR SKILL */}
            <Modal isOpen={modalSkillOpen} setOpen={setModalSkillOpen} titulo="Adicionar Skill" afterOpen={() => { }}>
                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={adicionarSkillHandler}>

                    <div className="radio__group">
                        <div>
                            <input type="radio" name="tipoCadastro" value="hard" id="radio-hard-skill" required defaultChecked onClick={trocarTipoSkill} />
                            <label htmlFor="radio-hard-skill">Hard Skill</label>
                        </div>

                        <div>
                            <input type="radio" name="tipoCadastro" value="soft" id="radio-soft-skill" onClick={trocarTipoSkill} />
                            <label htmlFor="radio-soft-skill">Soft Skill</label>
                        </div>
                    </div>

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

                    <div id='secao-soft-skill' style={{ display: 'none', width: '100%' }}>
                        <div className="form__group col-12 skill" id='div-soft-skill'>
                            <label htmlFor="input-soft-skill">Soft Skill</label>
                            <input type="text" className="form__control" placeholder="Soft Skill" required name="input-soft-skill" id="input-soft-skill" disabled />
                        </div>
                    </div>

                    <div className="botoes">
                        <Botao tipo='vazio' cor='azul'>
                            Cadastrar
                        </Botao>
                    </div>

                </form>
            </Modal>
        </>
    )
}

export default PerfilCandidato;