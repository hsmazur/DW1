// Obtendo o botão pelo ID
const btnAlterarTexto = document.getElementById('btnAlterarTexto');

// Função para alternar o texto do botão
function alterarTexto() {
    if (btnAlterarTexto.textContent === 'Clique Aqui') {
        btnAlterarTexto.textContent = 'Obrigado por clicar'; // Texto quando clicado
    } else {
        btnAlterarTexto.textContent = 'Clique Aqui'; // Texto quando clicar novamente
    }
}

// Adicionando o evento de clique no botão
btnAlterarTexto.addEventListener('click', alterarTexto);
