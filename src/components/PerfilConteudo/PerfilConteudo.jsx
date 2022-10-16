import React from 'react';
import { RemoveItem } from '../../pages/Perfil/styled';
import './PerfilConteudo.css'

function PerfilConteudo(props) {

    return (
        <div className="perfil__conteudo">
            <h1>{props.titulo}</h1>

            {props.children}

            {
                props.contatos && (
                    <>
                        <div className="conteudo__item">
                            <h1>Telefone</h1>
                            {
                                props.contatos.filter(item => item.telefone != null).map((item, i) => (
                                    <React.Fragment key={item.id}>
                                        <h3>{item.telefone}</h3>
                                        {
                                            props.donoPerfil &&
                                            <RemoveItem onClick={() => props.remover(item.id)}>
                                                <i className="fi fi-recycle-bin"></i>
                                            </RemoveItem>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </div>

                        <div className="conteudo__item">
                            <h1>Email</h1>
                            {
                                props.contatos.filter(item => item.email != null).map((item, i) => (
                                    <React.Fragment key={item.id}>
                                        <h3>{item.email}</h3>
                                        {
                                            item.email === props.userPerfil.usuario.login
                                                ? props.donoPerfil && <RemoveItem>Seu login</RemoveItem>
                                                : props.donoPerfil && <RemoveItem onClick={() => props.remover(item.id)}>
                                                    <i className="fi fi-recycle-bin"></i>
                                                </RemoveItem>
                                        }
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </>
                )
            }
            {
                props.formacoes && (
                    props.formacoes.map((formacao, i) => (
                        <div className="conteudo__item" key={i}>
                            <h1>{formacao.instituicao}</h1>
                            <h3>{formacao.grauAcademico}</h3>
                            <h3>{formacao.curso}</h3>
                            <h3>Início: {formacao.dataInicio}</h3>
                            <h3>Término: {formacao.dataFim}</h3>
                            {
                                props.donoPerfil &&
                                <RemoveItem className="centro" onClick={() => props.remover(formacao.id)}>
                                    <i className="fi fi-recycle-bin"></i>
                                </RemoveItem>
                            }
                        </div>
                    ))
                )
            }
            {
                props.skills && (
                    props.skills.map((skill, i) => (
                        <div className="conteudo__item" key={i}>
                            <h1>{skill.descricao}</h1>
                            {skill.tipo === 'H' && <h3>Nível de conhecimento: <span className='nivel'>{skill.nivel}</span></h3>}
                            {skill.tipo === 'S' && <h3>Soft Skill</h3>}
                            {
                                props.donoPerfil &&
                                <RemoveItem className="centro" onClick={() => props.remover(skill.id)}>
                                    <i className="fi fi-recycle-bin"></i>
                                </RemoveItem>
                            }
                        </div>
                    ))
                )
            }
            {
                props.enderecos && (
                    props.enderecos.map((endereco, i) => (
                        <div className="conteudo__item" key={i}>
                            <h1>{endereco.cidade}</h1>
                            <h3>Estado: {endereco.uf}</h3>
                            <h3>Rua: {endereco.logradouro}</h3>
                            <h3>Número: {endereco.numero}</h3>
                            <h3>Bairro: {endereco.bairro}</h3>
                            <h3>Complemento: {endereco.complemento ?? 'Nenhum'}</h3>
                            {
                                props.donoPerfil &&
                                props.enderecos.length > 1 &&
                                <RemoveItem className="centro" onClick={() => props.remover(endereco.idEnderaco)}>
                                    <i className="fi fi-recycle-bin"></i>
                                </RemoveItem>
                            }
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default PerfilConteudo;