import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import './Grafico.css'

function Grafico(props) {

    ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend, Title);

    return (
        <div className='grafico'>

            <div className="grafico__header">
                {props.children}
            </div>

            <div className="grafico__canvas">
                {
                    props.tipo === 'pie' &&
                    <Pie data={{
                        labels: props.labels,
                        datasets: [
                            {
                                label: 'Status das Candidaturas',
                                data: props.valores,
                                backgroundColor: [
                                    'lightgreen',
                                    'lightcoral',
                                    'gray',
                                ],
                                borderColor: [
                                    'darkgreen',
                                    'darkred',
                                    'black',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }} options={{
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: props.descricao
                            }
                        },
                    }} />
                }
                {
                    props.tipo === 'bar' &&
                    <Bar data={{
                        labels: ['Média (%)'],
                        datasets: [
                            {
                                label: props.labels[0],
                                data: [props.valores[0]],
                                backgroundColor: 'lightgreen',
                                borderColor: 'darkgreen',
                                borderWidth: 1,
                            },
                            {
                                label: props.labels[1],
                                data: [props.valores[1]],
                                backgroundColor: 'lightcoral',
                                borderColor: 'darkred',
                                borderWidth: 1,
                            },
                            {
                                label: props.labels[2],
                                data: [props.valores[2]],
                                backgroundColor: 'gray',
                                borderColor: 'black',
                                borderWidth: 1,
                            },
                        ]
                    }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: props.descricao
                                }
                            },
                            scales: {
                                y: { min: 0, max: 100, stepSize: 10 }
                            }
                        }} />
                }
                {
                    props.tipo === 'line' &&
                    <Line data={{
                        labels: props.labels,
                        datasets: [
                            {
                                label: 'Candidaturas',
                                data: props.valores,
                                backgroundColor: '#0067f4',
                                borderColor: '#88b9ff',
                                tension: 0.5
                            },
                        ]
                    }}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: props.descricao
                                },
                                legend: {
                                    position: 'top',
                                },
                            }
                        }} />
                }
            </div>
        </div>
    )
}

export default Grafico;