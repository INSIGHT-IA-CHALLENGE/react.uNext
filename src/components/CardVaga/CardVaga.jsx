import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserLogado } from '../../auth/auth';
import './CardVaga.css'

function CardVaga(props) {

    const userLogado = getUserLogado()

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

    function calcularMatch() {

        const vagaSkills = props.vaga?.skillsDesejadas
        if (vagaSkills?.length > 0) {

            let pontosPossiveis = vagaSkills?.length * 100
            let pontosFeitos = 0

            vagaSkills?.forEach(skill => {
                for (let index = 0; index < props.candidatoSkills?.length; index++) {

                    if (props.candidatoSkills[index].id === skill.id) {
                        pontosFeitos += 50

                        if (props.candidatoSkills[index].nivel >= skill.nivel)
                            pontosFeitos += 50
                    }
                }
            })

            let porcentagem =  Math.round((pontosFeitos * 100)/pontosPossiveis)

            if(porcentagem < 0)
                porcentagem = 0
            else if(porcentagem > 100)
                porcentagem = 100


            return porcentagem
        }

        return 100
    }

    return (
        <Link to={`./${props.vaga.id}`}>
            <div className="vagas__vaga">
                <div className="vaga__title">
                    <span>
                        Inscrição até:
                        <br />
                        {props.vaga.dataEncerramento}
                    </span>
                    <img src={`data:image/png;base64,${props.vaga.empresa.fotoEmpresa}`} alt="Logo Fiap" />
                    <span>
                        Salário:
                        <br />
                        R${props.vaga.salario.toFixed(2)}
                    </span>
                </div>
                <div className="vaga__conteudo">
                    <h1>{props.vaga.empresa.nome}</h1>
                    <p>
                        <span>Cargo: </span>
                        {props.vaga.cargo}
                    </p>
                    <p>
                        <span>Descrição: </span>
                        {props.vaga.descricao.slice(0, 304)}
                        {props.vaga.descricao.length >= 304 ? '...' : ''}
                    </p>

                    <p>
                        <span>Hard Skills: </span>
                        {
                            props.vaga.skillsDesejadas.length === 0
                                ? 'Nenhuma'
                                : props.vaga.skillsDesejadas.map((skill, index) => {
                                    let aux = skill.descricao + ', '
                                    if (index + 1 === props.vaga.skillsDesejadas.length)
                                        aux = aux.replace(',', '')

                                    return aux
                                })
                        }
                    </p>
                </div>

                {
                    userLogado.tipo === 'candidato' &&
                    props.userCandidato !== null &&
                    <div className="vaga__compatibilidade">
                        <h1>Match Level</h1>
                        <div className="compatibilidade__match">
                            <div className="match__level" data-match={calcularMatch()}></div>
                            <div className="match__brilho"></div>
                        </div>
                    </div>
                }
            </div>
        </Link>
    )
}

export default CardVaga;