// Inicializa o contador
let contador = 0;
const contadorDisplay = document.getElementById('contador');
const btnZerar = document.getElementById('btnZerar');

// Função para atualizar o contador na tela
function atualizarContador() {
    contador++;
    contadorDisplay.textContent = contador;
}

// Função para zerar o contador
function zerarContador() {
    contador = -1;
    contadorDisplay.textContent = contador;
}

// Evento de clique em qualquer parte da tela para incrementar o contador
document.body.addEventListener('click', atualizarContador);

// Evento de clique no botão para zerar o contador
btnZerar.addEventListener('click', zerarContador);
