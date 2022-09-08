import React from 'react';
import './Notificacao.css'

function Notificacao(props) {
    return (
        <div className={`notificacoes__notificacao ${props.dados.vista}`}>
            {props.dados.vista === false && <i className="fi fi-bell"></i>}
            {props.dados.vista === true && <i className="fi fi-bell-silent"></i>}

            <div className="notificacao__conteudo">
                <h1>{props.dados.tipo}</h1>
                <h3>{props.dados.empresa}</h3>
                <h3>{props.dados.cargo}</h3>
                <h6>{props.dados.descricao}</h6>
                <strong>{props.dados.data}</strong>
            </div>
        </div>
    )
}

export default Notificacao;