import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardVaga.css'

function CardVaga(props) {

    useEffect(() => {
        document.querySelector('.vagas').addEventListener("wheel", (evt) => {
            evt.preventDefault();
            document.querySelector('.vagas').scrollLeft += evt.deltaY;
        });

        document.querySelectorAll('.compatibilidade__match').forEach(element => {

            let match = element.querySelector('.match__level')
            let brilho = element.querySelector('.match__brilho')

            let matchLevel = match.attributes.getNamedItem('data-match').value

            if (matchLevel < 15) {
                match.style.width = '15%'
                match.style.backgroundColor = 'var(--barra3)'

                brilho.style.width = 'calc(15% - 30px)'
                brilho.style.backgroundColor = 'var(--progresso3)'

            } else if (matchLevel <= 40) {
                match.style.width = `${matchLevel}%`
                match.style.backgroundColor = 'var(--barra3)'

                brilho.style.width = `calc(${matchLevel}% - 30px)`
                brilho.style.backgroundColor = 'var(--progresso3)'

            } else if (matchLevel <= 70) {
                match.style.width = `${matchLevel}%`
                match.style.backgroundColor = 'var(--barra2)'

                brilho.style.width = `calc(${matchLevel}% - 30px)`
                brilho.style.backgroundColor = 'var(--progresso2)'

            } else if (matchLevel <= 100) {
                match.style.width = `${matchLevel}%`
                match.style.backgroundColor = 'var(--barra1)'

                brilho.style.width = `calc(${matchLevel}% - 30px)`
                brilho.style.backgroundColor = 'var(--progresso1)'
            }
        })
    }, [])

    return (
        <Link to={`./${props.vaga.idVaga}`}>
            <div className="vagas__vaga">
                <div className="vaga__title">
                    <span>
                        Inscrição até:
                        <br />
                        {props.vaga.dtEncerramento}
                    </span>
                    <img src={props.vaga.imgEmpresa} alt="Logo Fiap" />
                    <span>
                        Salário:
                        <br />
                        R${props.vaga.salario.toFixed(2)}
                    </span>
                </div>
                <div className="vaga__conteudo">
                    <h1>{props.vaga.empresa}</h1>
                    <p>
                        <span>Cargo: </span>
                        {props.vaga.cargo}
                    </p>
                    <p>
                        <span>Descrição: </span>
                        {props.vaga.descricao}
                    </p>
                    <p>
                        <span>Hard Skills: </span>
                        {
                            props.vaga.hardSkills.map((skill, index) => {
                                let aux = new String(skill + ', ')
                                if (index + 1 === props.vaga.hardSkills.length)
                                    aux = aux.replace(',', '')

                                return aux
                            })
                        }
                    </p>
                </div>

                <div className="vaga__compatibilidade">
                    <h1>Match Level</h1>
                    <div className="compatibilidade__match">
                        <div className="match__level" data-match={props.vaga.match}></div>
                        <div className="match__brilho"></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardVaga;