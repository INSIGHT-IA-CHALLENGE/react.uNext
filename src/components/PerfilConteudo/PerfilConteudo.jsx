import React from 'react';
import './PerfilConteudo.css'

function PerfilConteudo(props) {
    return (
        <div className="perfil__conteudo">
            <h1>{props.children}</h1>

            {
                props.contatos && (
                    <>
                        <div className="conteudo__item">
                            <h1>Telefone</h1>
                            {
                                props.contatos.filter(item => item.telefone != null).map((item, i) => (
                                    <h3 key={item.id}>{item.telefone}</h3>
                                ))
                            }
                        </div>

                        <div className="conteudo__item">
                            <h1>Email</h1>
                            {
                                props.contatos.filter(item => item.email != null).map((item, i) => (
                                    <h3 key={item.id}>{item.email}</h3>
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
                            <h1>{formacao.descricao}</h1>
                            <h3>{formacao.grau}</h3>
                            <h3>{formacao.curso}</h3>
                            <h3>Início: {formacao.inicio}</h3>
                            <h3>Término: {formacao.termino}</h3>
                        </div>
                    ))
                )
            }
            {
                props.skills && (
                    props.skills.map((skill, i) => (
                        <div className="conteudo__item" key={i}>
                            <h1>{skill.descricao}</h1>
                            {skill.hardSkill.toString() === 'true' && <h3>Nível de conhecimento: <span className='nivel'>{skill.nivel}</span></h3>}
                            {skill.hardSkill.toString() === 'false' && <h3>Soft Skill</h3>}
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default PerfilConteudo;