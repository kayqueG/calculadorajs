'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // qualquer elemento que tenha como parte do atributo o 'tecla'
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true; // variavel booleana para imoedir que concatene numeros depois dos operadores
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()) {
        novoNumero = true
        const numeroAtual = parseFloat(display.textContent);
        if (operador == '+') {
            atualizarDisplay(numeroAnterior + numeroAtual);
        } else if (operador == '-') {
            atualizarDisplay(numeroAnterior - numeroAtual);
        } else if (operador == '*') {
            atualizarDisplay(numeroAnterior * numeroAtual);
        } else if (operador == '/') {
            atualizarDisplay(numeroAnterior / numeroAtual);
        }
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto;
        novoNumero = false;
    } else {
        display.textContent += texto;
    }


}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);  // mandando o texto que esta em cada uma das teclas que foram clicados

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent);
    }
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador= undefined; // impedindo que o calculo seja efetuado sempre que clickamos no igual
}

document.getElementById('igual').addEventListener('click',ativarIgual);