// Obtendo os elementos do jogo
const personagem = document.getElementById('personagem');
const cidade = document.getElementById('cidade');

function atualizarRelogio() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    document.getElementById('relogio').textContent = `${horas}:${minutos}:${segundos}`;
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// Posições iniciais centralizadas na cidade
let posX = cidade.clientWidth / 2 - 50;
let posY = cidade.clientHeight / 2 - 50;

// Direção inicial (direita)
let direcao = 'direita';

// Flags de movimento
let movendoCima = false;
let movendoBaixo = false;
let movendoEsquerda = false;
let movendoDireita = false;

// Função para mover o personagem
function moverPersonagem() {
    const passo = 5;

    if (movendoCima) {
        posY -= passo;
        direcao = 'cima';
    }
    if (movendoBaixo) {
        posY += passo;
        direcao = 'baixo';
    }
    if (movendoEsquerda) {
        posX -= passo;
        direcao = 'esquerda';
    }
    if (movendoDireita) {
        posX += passo;
        direcao = 'direita';
    }

    // Garantir que o personagem não saia da cidade
    posX = Math.max(0, Math.min(cidade.clientWidth - 100, posX));
    posY = Math.max(0, Math.min(cidade.clientHeight - 100, posY));

    // Atualizando a posição do personagem
    personagem.style.left = posX + 'px';
    personagem.style.top = posY + 'px';
}

// Função para criar e mover os quadradinhos na direção do personagem
function atirar() {
    const quadradinho = document.createElement('div');
    quadradinho.classList.add('quadradinho');
    quadradinho.style.left = (posX + 45) + 'px';
    quadradinho.style.top = (posY + 45) + 'px';
    cidade.appendChild(quadradinho);

    let velocidade = 10;
    let quadradinhoX = posX + 45;
    let quadradinhoY = posY + 45;
    let direcaoTiro = direcao; // Salvar a direção no momento do disparo

    function moverQuadradinho() {
        switch (direcaoTiro) {
            case 'cima': quadradinhoY -= velocidade; break;
            case 'baixo': quadradinhoY += velocidade; break;
            case 'esquerda': quadradinhoX -= velocidade; break;
            case 'direita': quadradinhoX += velocidade; break;
        }

        quadradinho.style.left = quadradinhoX + 'px';
        quadradinho.style.top = quadradinhoY + 'px';

        // Remover quando sair da tela
        if (
            quadradinhoX < 0 || quadradinhoX > cidade.clientWidth ||
            quadradinhoY < 0 || quadradinhoY > cidade.clientHeight
        ) {
            quadradinho.remove();
        } else {
            requestAnimationFrame(moverQuadradinho);
        }
    }

    moverQuadradinho();
}

// Eventos de teclado para movimento e tiro
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') movendoCima = true;
    if (event.key === 'ArrowDown') movendoBaixo = true;
    if (event.key === 'ArrowLeft') movendoEsquerda = true;
    if (event.key === 'ArrowRight') movendoDireita = true;
    if (event.key === ' ') atirar();
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') movendoCima = false;
    if (event.key === 'ArrowDown') movendoBaixo = false;
    if (event.key === 'ArrowLeft') movendoEsquerda = false;
    if (event.key === 'ArrowRight') movendoDireita = false;
});

// Loop do jogo
function gameLoop() {
    moverPersonagem();
    requestAnimationFrame(gameLoop);
}

gameLoop();

/* Detecta colisão do tiro com o carro */
function detectarColisao(tiro, carro) {
    let tiroRect = tiro.getBoundingClientRect();
    let carroRect = carro.getBoundingClientRect();
    
    return (
        tiroRect.left < carroRect.right &&
        tiroRect.right > carroRect.left &&
        tiroRect.top < carroRect.bottom &&
        tiroRect.bottom > carroRect.top
    );
}

// Verifica colisões entre tiros e carros a cada intervalo
setInterval(() => {
    document.querySelectorAll('.quadradinho').forEach(tiro => {
        document.querySelectorAll('.carro').forEach(carro => {
            if (detectarColisao(tiro, carro)) {
                carro.classList.add('explosao');
                setTimeout(() => carro.remove(), 500); // Remove o carro após a explosão
                tiro.remove(); // Remove o tiro após a colisão
            }
        });
    });
}, 50);
