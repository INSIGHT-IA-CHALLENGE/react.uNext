import React from 'react';
import './Botao.css'

function Botao(props) {
  return (
    <button className={`btn ${props.tipo} ${props.cor}`} onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default Botao;