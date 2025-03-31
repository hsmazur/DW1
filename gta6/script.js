// Obtendo o elemento do personagem
const personagem = document.getElementById('personagem');
const cidade = document.getElementById('cidade');

// Posições iniciais
let posX = 50;
let posY = 50;

// Flags de movimento
let movendoCima = false;
let movendoBaixo = false;
let movendoEsquerda = false;
let movendoDireita = false;

// Função para mover o personagem
function moverPersonagem() {
    const passo = 5; // Define a distância do movimento

    // Mover o personagem conforme as flags
    if (movendoCima) posY -= passo;
    if (movendoBaixo) posY += passo;
    if (movendoEsquerda) posX -= passo;
    if (movendoDireita) posX += passo;

    // Garantir que o personagem não saia da tela
    posX = Math.max(0, Math.min(window.innerWidth - 50, posX));
    posY = Math.max(0, Math.min(window.innerHeight - 50, posY));

    // Atualizando a posição do personagem na tela
    personagem.style.left = posX + 'px';
    personagem.style.top = posY + 'px';
}

// Função para criar e mover os quadradinhos
function atirar() {
    // Criar um novo quadradinho
    const quadradinho = document.createElement('div');
    quadradinho.classList.add('quadradinho');
    quadradinho.style.left = (posX + 25) + 'px'; // Posicionar na frente do personagem
    quadradinho.style.top = (posY + 25) + 'px'; // Posicionar na frente do personagem
    cidade.appendChild(quadradinho);

    // Movimento do quadradinho
    let quadradinhoX = posX + 25;
    const velocidade = 10; // Velocidade do quadradinho

    function moverQuadradinho() {
        quadradinhoX += velocidade;
        quadradinho.style.left = quadradinhoX + 'px';

        // Remover quadradinho quando sair da tela
        if (quadradinhoX > window.innerWidth) {
            quadradinho.remove();
        } else {
            requestAnimationFrame(moverQuadradinho);
        }
    }

    moverQuadradinho();
}

// Adicionar eventos de teclado para movimentar o personagem e atirar
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        movendoCima = true;
    } else if (event.key === 'ArrowDown') {
        movendoBaixo = true;
    } else if (event.key === 'ArrowLeft') {
        movendoEsquerda = true;
    } else if (event.key === 'ArrowRight') {
        movendoDireita = true;
    } else if (event.key === ' ') { // Quando apertar espaço
        atirar();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        movendoCima = false;
    } else if (event.key === 'ArrowDown') {
        movendoBaixo = false;
    } else if (event.key === 'ArrowLeft') {
        movendoEsquerda = false;
    } else if (event.key === 'ArrowRight') {
        movendoDireita = false;
    }
});

// Atualizar a posição do personagem continuamente
function gameLoop() {
    moverPersonagem();
    requestAnimationFrame(gameLoop); // Chama a função recursivamente
}

// Iniciar o loop do jogo
gameLoop();
