import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl, deslogar } from '../../auth/auth';
import Botao from '../Botao/Botao';
import Modal from '../Modal/Modal';
import IMask from 'imask';
import { AddFoto, AddItem } from '../../pages/Perfil/styled';
import PerfilConteudo from '../PerfilConteudo/PerfilConteudo';
import { useEffect } from 'react';

function PerfilEmpresa(props) {

    const [modalSairOpen, setModalSairOpen] = useState(false)
    const [modalEditarOpen, setModalEditarOpen] = useState(false)
    const [modalEnderecoOpen, setModalEnderecoOpen] = useState(false)



    //PERFIL
    function editarPerfilHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = {
            id: props.userPerfil.id,
            nome: form.querySelector('#nome').value,
            razaoSocial: form.querySelector('#razaoSocial').value,
            cnpj: form.querySelector('#cnpj').value,
            atuacao: form.querySelector('#atuacao').value,
            descricao: form.querySelector('#descricao').value?.replaceAll('\n', '<br/>'),
            usuario: {
                id: props.userPerfil.usuario.id,
                senha: form.querySelector('#nova-senha').value == ''
                    ? props.userPerfil.usuario.senha
                    : form.querySelector('#nova-senha').value
            }
        }

        fetch(`${baseUrl()}/empresa/perfil/${props.userPerfil.id}`, {
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

    useEffect(() => {
        const descricao = document.getElementById('descricao-perfil')
        descricao.innerHTML = props.userPerfil.descricao ?? 'Sem descrição'
    }, [props.userPerfil.descricao])



    //CRUD ENDERECO
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

    function adicionarEnderecoHandler(e) {
        e.preventDefault()
        const form = e.target

        const data = {
            logradouro: form.querySelector('#rua').value,
            numero: form.querySelector('#numero').value,
            complemento: form.querySelector('#referencia').value,
            bairro: form.querySelector('#bairro').value,
            cidade: form.querySelector('#cidade').value,
            uf: form.querySelector('#uf').value,
            cep: form.querySelector('#cep').value,
        }

        fetch(`${baseUrl()}/empresa/${props.userPerfil.id}/endereco`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(async res => {
                if (res.ok) {
                    setModalEnderecoOpen(false)
                    props.atualizaPerfil()
                }
            })
    }

    function removerEnderecoHandler(id) {
        fetch(`${baseUrl()}/empresa/endereco/${id}`, {
            method: 'DELETE',
        })
            .then(async res => {
                if (res.ok) {
                    setModalEnderecoOpen(false)
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
                            <img src={props.userPerfil.fotoEmpresa ? `data:image/png;base64,${props.userPerfil.fotoEmpresa}` : '/images/user.png'} alt="Foto User" id='ft-perfil' />
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
                            <h3>{props.userPerfil.razaoSocial}</h3>
                            <h3>{props.userPerfil.atuacao ?? ''}</h3>
                            <h3>{props.userPerfil.cnpj}</h3>
                        </div>
                    </div>

                    <PerfilConteudo titulo="Descrição">
                        <div className="conteudo__item">
                            <h3 id="descricao-perfil" />
                        </div>
                    </PerfilConteudo>

                    <PerfilConteudo enderecos={props.userPerfil.enderecos} titulo={"Localidades"} donoPerfil={props.donoPerfil} remover={removerEnderecoHandler}>
                        {
                            props.donoPerfil &&
                            <AddItem onClick={() => setModalEnderecoOpen(true)}>
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
                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={editarPerfilHandler}>
                    <div className="form__group col-12 empresa" style={{ marginTop: 0 }}>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" className="form__control" placeholder="Nome Completo" required name="nome" id="nome" defaultValue={props.userPerfil.nome} />
                    </div>

                    <div className="form__group col-12 empresa">
                        <label htmlFor="razaoSocial">Razão Social</label>
                        <input type="text" className="form__control" placeholder="Razão Social" required name="razaoSocial" id="razaoSocial" defaultValue={props.userPerfil.razaoSocial} />
                    </div>

                    <div className="form__group col-12 documento">
                        <label htmlFor="cnpj">CNPJ</label>
                        <input type="numeric" className="form__control" placeholder="CNPJ" required name="cnpj" id="cnpj" defaultValue={props.userPerfil.cnpj} />
                    </div>

                    <div className="form__group col-12 empresa">
                        <label htmlFor="razaoSocial">Atuação</label>
                        <input type="text" className="form__control" placeholder="Atuação" name="atuacao" id="atuacao" defaultValue={props.userPerfil.atuacao} />
                    </div>

                    <div className="form__group col-12 mensagem">
                        <label htmlFor="mensagem">Descrição</label>
                        <textarea type="area" name="descricao" id="descricao" className="form__control" placeholder="Descrição" autoComplete="off"
                            defaultValue={props.userPerfil.descricao?.replaceAll('<br/>', '\n')}></textarea>
                    </div>

                    <div className="form__group col-12 email">
                        <label htmlFor="email">Seu Login</label>
                        <input type="email" className="form__control" placeholder="Email" required name="email" id="email" readOnly
                            defaultValue={props.userPerfil.usuario.login} />
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

            {/* MODAL ENDERECO */}
            <Modal isOpen={modalEnderecoOpen} setOpen={setModalEnderecoOpen} titulo="Adicionar Endereço" afterOpen={() => { }}>
                <form action="" style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={adicionarEnderecoHandler}>

                    <div className="form__group col-6 endereco">
                        <label htmlFor="cep">CEP</label>
                        <input type="numeric" className="form__control" placeholder="00000-000" required name="cep" id="cep"
                            onChange={(e) => {
                                IMask(e.target, { mask: '00000-000' })
                                let cep = e.target.value

                                if (cep.length === 9)
                                    pesquisacep(cep)
                            }} />
                    </div>

                    <div className="form__group col-6 endereco">
                        <label htmlFor="uf">UF</label>
                        <input type="text" className="form__control" placeholder="UF" required name="uf" id="uf" readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="rua">Rua</label>
                        <input type="text" className="form__control" placeholder="Rua" required name="logradouro" id="rua" readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="bairro">Bairro</label>
                        <input type="text" className="form__control" placeholder="Bairro" required name="bairro" id="bairro" readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="cidade">Cidade</label>
                        <input type="text" className="form__control" placeholder="Cidade" required name="cidade" id="cidade" readOnly />
                    </div>

                    <div className="form__group col-12 endereco">
                        <label htmlFor="referencia">Ponto de Referência</label>
                        <input type="text" className="form__control" placeholder="Ponto de Referência" name="referencia" id="referencia" />
                    </div>

                    <div className="form__group col-6 endereco">
                        <label htmlFor="numero">Número</label>
                        <input type="numeric" className="form__control" placeholder="Número" required name="numero" id="numero" maxLength={9}
                            onChange={(e) => {
                                IMask(e.target, { mask: new RegExp(/^[0-9]*$/) })
                            }} />
                    </div>

                    <div className="botoes">
                        <Botao tipo='vazio' cor='azul'>
                            Adicionar
                        </Botao>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default PerfilEmpresa;