import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import Header from '../../components/Header/Header';
import TabMenu from '../../components/TabMenu/TabMenu';
import './Vaga.css'

function Vaga() {

    const [vaga, setVaga] = useState({
        idVaga: 0,
        imgEmpresa: '',
        empresa: '',
        dtEncerramento: '',
        salario: 0,
        cargo: '',
        descricao: '',
        hardSkills: [],
        match: 0
    })

    useEffect(() => {
        let loadVaga = {
            idVaga: 5,
            imgEmpresa: 'data:image/png;base64,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',
            empresa: 'Colégio Modulo',
            dtEncerramento: '17/10/2022',
            salario: 2300.50,
            cargo: 'Estágio em desenvolvimento',
            descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet a sit doloremque quae culpa, tempore explicabo blanditiis praesentium nisi natus pariatur, maiores adipisci deserunt dolore beatae? Similique deserunt error delectus!',
            hardSkills: ['Java', 'Oracle DB', 'HTML', 'CSS3', 'JavaScript'],
            vagas: 2,
            match: 70
        }

        setVaga(loadVaga)
    }, [])

    function corMatch(match) {
        if (match <= 40) {
            return 'var(--barra3)'

        } else if (match <= 70) {
            return 'var(--barra2)'

        } else {
            return 'var(--barra1)'
        }
    }

    return (
        <>
            <Header />

            <main className="container">
                <div className="vaga">

                    <div>
                        <img src={vaga.imgEmpresa} alt="Logo" />
                        <h1>{vaga.empresa}</h1>
                    </div>

                    <p>
                        <span>Match Level: </span>
                        <strong style={{ backgroundColor: corMatch(vaga.match) }}>
                            {vaga.match}%
                        </strong>
                    </p>

                    <p>
                        <span>Inscrição até: </span> {vaga.dtEncerramento}
                    </p>

                    <p>
                        <span>Salário: </span> R${vaga.salario.toFixed(2)}
                    </p>

                    <p>
                        <span>Cargo: </span> {vaga.cargo}
                    </p>

                    <p>
                        <span>Hard Skills: </span>
                        {
                            vaga.hardSkills.map((skill, index) => {
                                let aux = skill + ', '
                                if (index + 1 === vaga.hardSkills.length)
                                    aux = aux.replace(',', '')

                                return aux
                            })
                        }
                    </p>

                    <p>
                        <span>Vagas Dísponiveis: </span>{vaga.vagas}
                    </p>

                    <p>
                        <span>Descrição: </span>{vaga.descricao}

                    </p>

                    <div className="botoes">
                        <Link to="/vagas">
                            <Botao tipo='vazio'>Voltar</Botao>
                        </Link>
                        <Botao tipo='cheio' cor='azul'>Me Candidatar</Botao>
                    </div>

                </div>
            </main>

            <TabMenu />
        </>
    )
}

export default Vaga;