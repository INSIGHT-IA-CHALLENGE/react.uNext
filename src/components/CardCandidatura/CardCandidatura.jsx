import React from 'react';
import { Link } from 'react-router-dom';
import './CardCandidatura.css'

function CardCandidatura(props) {
    return (
        <Link to={`./${props.dados.id}`}>
            <article className='candidaturas__candidatura'>
                <img src={props.dados.imgEmpresa} alt="Logo Empresa" />

                <div className="candidatura__infos">
                    <h1>{props.dados.empresa}</h1>
                    <h3>{props.dados.cargo}</h3>
                    <h3>Encerramento: {props.dados.dtEncerramento}</h3>
                    <strong className={props.dados.status.toLowerCase().replace(' ', '_')}>
                        {props.dados.status}
                    </strong>
                </div>

            </article>
        </Link>
    )
}

export default CardCandidatura;