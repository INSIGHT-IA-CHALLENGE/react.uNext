import React from 'react';
import { Link } from 'react-router-dom';
import './TabMenu.css'
import '../../styles/Logado.css'
import { getUserLogado } from '../../auth/auth';

function TabMenu(props) {

    const userLogado = getUserLogado()

    return (
        <footer className="tabbar">
            <nav>
                <ul className='tabbar__itens'>
                    <Link to="/estatisticas">
                        <li className={`estatisticas-icon ${props.tab === 'estatisticas'? 'ativo' : ''}`}></li>
                    </Link>
                    <Link to="/candidaturas">
                        <li className={`candidaturas-icon ${props.tab === 'candidaturas'? 'ativo' : ''}`}></li>
                    </Link>
                    <Link to="/vagas">
                        <li className={`vagas-icon ${props.tab === 'vagas'? 'ativo' : ''}`}></li>
                    </Link>
                    <Link to="/notificacoes">
                        <li className={`notificacoes-icon ${props.tab === 'notificacoes'? 'ativo' : ''}`}></li>
                    </Link>
                    <Link to={`/perfil/${userLogado.tipo}/${userLogado.id}`}>
                        <li className={`perfil-icon ${props.tab === 'perfil'? 'ativo' : ''}`}></li>
                    </Link>
                </ul>
            </nav>
        </footer>
    )
}

export default TabMenu;