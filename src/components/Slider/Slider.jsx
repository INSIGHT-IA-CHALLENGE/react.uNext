import React from 'react';
import { useEffect } from 'react';
import './Slider.css'

function Slider() {

    var $index = 0;
    var $slides;
    var $indexSlider;
    var $totalSlides;
    var $posicaoClickStart = 0;
    var $posicaoClickEnd = 0;


    useEffect(() => {
        $slides = document.querySelectorAll('.slide')
        $indexSlider = document.querySelectorAll('.index-slider .fi')
        $totalSlides = $indexSlider.length

        document.querySelector('.direita').addEventListener('click', () => {
            toDireita()
        })

        document.querySelector('.esquerda').addEventListener('click', () => {
            toEsquerda()
        })

        document.querySelectorAll('.index-slider .fi').forEach((element) => {
            element.addEventListener('click', () => {
                $index = parseInt(element.attributes.getNamedItem('data-index').value)
                alteraSlide()
            })
        })

        document.querySelectorAll('.slide div').forEach((element) => {

            element.addEventListener('touchstart', (event) => {
                $posicaoClickStart = event.touches[0].clientX
            })

            element.addEventListener('touchmove', (event) => {
                event.preventDefault()
                $posicaoClickEnd = event.touches[0].clientX
            })

            element.addEventListener('touchend', (event) => {
                var totalDeslize = $posicaoClickStart - $posicaoClickEnd;

                if (totalDeslize > 80 || totalDeslize < -80) {
                    if ($posicaoClickStart < $posicaoClickEnd) {
                        toEsquerda()
                    } else {
                        toDireita()
                    }
                }
            })
        })

        initSlider()
    }, [])


    function initSlider() {
        alteraSlide()
        trocaAutomatico()
    }

    function toEsquerda() {

        if ($index + 1 === $totalSlides)
            $index = 0
        else
            $index++;

        alteraSlide()
    }

    function toDireita() {
        if ($index === 0)
            $index = $totalSlides - 1
        else
            $index--;

        alteraSlide()
    }

    function alteraSlide() {

        $slides.forEach((element, index) => {
            $slides[index].classList.remove('selecionado')
            $indexSlider[index].classList.remove('fi-circle')
            $indexSlider[index].classList.add('fi-circle-line')
        });

        $slides[$index].classList.add('selecionado')
        $indexSlider[$index].classList.remove('fi-circle-line')
        $indexSlider[$index].classList.add('fi-circle')
    }

    function trocaAutomatico() {
        setInterval(() => {
            toDireita()
        }, 10000)
    }


    return (

        <div className="slider">

            <div className="slider-icon esquerda">
                <i className="fi fi-line-angle-left"></i>
            </div>
            <div className="slider-icon direita">
                <i className="fi fi-line-angle-right"></i>
            </div>

            <div className="slide">
                <div>
                    <h1>Conheça o Match Level</h1>
                    <p>
                        Uma forma simples e intuitiva de como medimos a compatibilidade de cada candidato com uma vaga.
                    </p>
                </div>
                <img src="/images/slide1.png" alt="Termometro quente e chama" />
            </div>

            <div className="slide">
                <div>
                    <h1>Somente o que Deseja</h1>
                    <p>
                        Tanto candidatos quanto recrutadores possuem diversas formas de filtrar seus desejos na
                        plataforma.
                    </p>
                </div>
                <img src="/images/slide2.png" alt="Site com um filtro" />
            </div>

            <div className="slide">
                <div>
                    <h1>Facilitando sua Vida</h1>
                    <p>
                        Uma plataforma completa para te ajudar a escolher o melhor para o seu futuro.
                    </p>
                </div>
                <img src="/images/slide3.png" alt="Lupa" />
            </div>

            <div className="index-slider">
                <i className="fi fi-circle" data-index="0"></i>
                <i className="fi fi-circle-line" data-index="1"></i>
                <i className="fi fi-circle-line" data-index="2"></i>
            </div>

        </div>

    )
}

export default Slider;