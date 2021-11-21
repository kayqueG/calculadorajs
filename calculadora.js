'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]'); // qualquer elemento que tenha como parte do atributo o 'tecla'
const operadores = document.querySelectorAll('[id*=operador]');


let novoNumero = true; // variável booleana para impedir que concatene numeros depois dos operadores

let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined;

const calcular = () => {
    if (operacaoPendente()) {
        novoNumero = true
        const numeroAtual = parseFloat(display.textContent.replace(',', '.'));  // troca a virgula pelo ponto
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
        display.textContent = texto.toLocaleString('BR'); // sempre que atualizar o display, troca de ponto para virgula
        novoNumero = false;
    } else {
        display.textContent += texto.toLocaleString('BR');
    }


}

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);  // mandando o texto que esta em cada uma das teclas que foram clicados

const selecionarOperador = (evento) => {
    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    }
}

numeros.forEach(numero => numero.addEventListener('click', inserirNumero));

operadores.forEach(operador => operador.addEventListener('click', selecionarOperador));

const ativarIgual = () => {
    calcular();
    operador = undefined; // impedindo que o calculo seja efetuado sempre que clicamos no igual

}

document.getElementById('igual').addEventListener('click', ativarIgual);

const limparDisplay = () => display.textContent = '';

document.getElementById('limparDisplay').addEventListener('click', limparDisplay);



const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}

document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

const removerUltimoCaracter = () => display.textContent = display.textContent.slice(0, -1); //remove o ultimp

document.getElementById('backspace').addEventListener('click', removerUltimoCaracter);

const inverterOperador = () => {
    novoNumero = true // atualiza o display com o numero
    atualizarDisplay(display.textContent * -1);
}


document.getElementById('inverter').addEventListener('click', inverterOperador);

const existeVirgula = () => display.textContent.indexOf(',') != -1;


const existeValor = () => display.textContent.length > 0;


const inserirVirgula = () => {
    if (!existeVirgula()) {
        if (existeValor()) {
            atualizarDisplay(',');
        } else {
            atualizarDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirVirgula);

// objeto para pegar as teclas digitadas pelo usuario
const teclado = {
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
    'Backspace': 'backspace',
    'Escape': 'limparCalculo',
    '/': 'operadorDivisao',
    '*': 'operadorMultiplicacao',
    '+': 'operadorAdicao',
    '-': 'operadorSubtracao',
    ',': 'decimal',
    'c': 'limparDisplay',
    '=': 'igual',
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;

    const teclaPermitida = () => Object.keys(teclado).indexOf(tecla) != -1 // verificando se existe a tecla no objeto teclado a partir de suas chaves


    if (teclaPermitida()) {
        document.getElementById(teclado[tecla]).click();
    }
}
document.addEventListener('keydown', mapearTeclado);


