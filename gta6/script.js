// Obtendo o elemento do personagem
const personagem = document.getElementById('personagem');

// Posições iniciais
let posX = 50;
let posY = 50;

// Função para mover o personagem
function moverPersonagem(direcao) {
    const passo = 5; // Define a distância do movimento

    // Mover o personagem conforme a direção
    switch (direcao) {
        case 'up':
            posY -= passo;
            break;
        case 'down':
            posY += passo;
            break;
        case 'left':
            posX -= passo;
            break;
        case 'right':
            posX += passo;
            break;
    }

    // Garantir que o personagem não saia da tela
    posX = Math.max(0, Math.min(window.innerWidth - 50, posX));
    posY = Math.max(0, Math.min(window.innerHeight - 50, posY));

    // Atualizando a posição do personagem na tela
    personagem.style.left = posX + 'px';
    personagem.style.top = posY + 'px';
}

// Adicionar evento de teclado para movimentar o personagem
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        moverPersonagem('up');
    } else if (event.key === 'ArrowDown') {
        moverPersonagem('down');
    } else if (event.key === 'ArrowLeft') {
        moverPersonagem('left');
    } else if (event.key === 'ArrowRight') {
        moverPersonagem('right');
    }
});
