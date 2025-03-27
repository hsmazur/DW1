// Obtendo o botão e o parágrafo pelo ID
const btnMostrarOcultar = document.getElementById('btnMostrarOcultar');
const paragrafo = document.getElementById('paragrafo');

// Função para mostrar ou esconder o parágrafo
function toggleParagrafo() {
    if (paragrafo.style.display === 'none') {
        paragrafo.style.display = 'block'; // Mostra o parágrafo
        btnMostrarOcultar.textContent = 'Esconder Parágrafo'; // Altera o texto do botão
    } else {
        paragrafo.style.display = 'none'; // Esconde o parágrafo
        btnMostrarOcultar.textContent = 'Mostrar Parágrafo'; // Altera o texto do botão
    }
}

// Evento de clique no botão para mostrar ou esconder o parágrafo
btnMostrarOcultar.addEventListener('click', toggleParagrafo);
