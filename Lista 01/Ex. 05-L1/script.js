// Obtendo o botão e o parágrafo pelo ID
const btnAlterarEstilo = document.getElementById('btnAlterarEstilo');
const paragrafo = document.getElementById('paragrafo');

// Definindo os estilos que alternam
const estilos = [
    { color: 'blue', fontSize: '30px', fontWeight: 'bold', fontStyle: 'italic' },
    { color: 'green', fontSize: '24px', fontWeight: 'normal', fontStyle: 'normal' },
    { color: 'red', fontSize: '40px', fontWeight: 'bold', fontStyle: 'italic' }
];

let estiloAtual = 0; // Índice do estilo atual

// Função para alterar o estilo do parágrafo
function alterarEstilo() {
    // Aplicando o estilo atual
    const estilo = estilos[estiloAtual];
    paragrafo.style.color = estilo.color;
    paragrafo.style.fontSize = estilo.fontSize;
    paragrafo.style.fontWeight = estilo.fontWeight;
    paragrafo.style.fontStyle = estilo.fontStyle;

    // Alterando para o próximo estilo
    estiloAtual = (estiloAtual + 1) % estilos.length; // Garantindo que retorne ao primeiro estilo após o último
}

// Adicionando o evento de clique no botão
btnAlterarEstilo.addEventListener('click', alterarEstilo);
