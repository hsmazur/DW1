document.getElementById('trocarBtn').addEventListener('click', function() {
    var imagem = document.getElementById('imagem');
    if (imagem.src.includes('bAntes.png')) {
        imagem.src = 'bDepois.png';  // Troque o caminho para a segunda imagem
    } else {
        imagem.src = 'bAntes.png';  // Troque de volta para a primeira imagem
    }
});
