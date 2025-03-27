// Obtendo os botões pelo id
const btnAzul = document.getElementById('btnAzul');
const btnVerde = document.getElementById('btnVerde');

// Adicionando o evento de clique para mudar a cor de fundo
btnAzul.addEventListener('click', () => {
    document.body.style.backgroundColor = 'blue';
});

btnVerde.addEventListener('click', () => {
    document.body.style.backgroundColor = 'green';
});
