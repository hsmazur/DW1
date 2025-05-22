No arquivo script.js

1) No vscode, como eu abro um terminal para executar comandos como git add ., ou npm, etc? Explique.
2) O que significa "ter um servidor rodando". A frase o servidor caiu, o que quer dizer? Você subiu o servidor? Explique essas frases.
3) O que é document.addEventListener('DOMContentLoaded', function() { ? Especialmente DOMContentLoaded
4) Explique  productForm.addEventListener('submit', function(e) {. Que evento submit é esse? O que é o preventDefault? ( e.preventDefault();)
5) Na função productForm.addEventListener, explique a const product e o if que vem na sequência
6)  function loadProducts() {
        fetch('http://localhost:3000/products'). O que é esse fetch? Para que serve?
7) No fetch, tem .then e .catch. O que é isso? Explique.
8) Explique a function addProductToTable(product) {. Prepare-se para fazer um teste de mesa demonstrando seu funcionamento. Onde esse função é chamada?
9) Na função addProductToTable, tem um querySelecto. O que é isso? Para que serve?
10) Na função createProduct, tem um body: JSON.stringfy(product). O que isso faz?
11) Na função createProduto, tem .catch(error => console.error('Erro ao criar produto:', error)); Onde vai printar essa mensagem de erro? Explique.
12) Na função function editProduct(id) {
        fetch(`http://localhost:3000/products/${id}`). O que é esse S{id} que aparece no fetch? Por quê? Explique isso.
13) Explique esse app.get('/products', (req, res) => {
    res.json(products);
});
O que é esse res? 
14) Explique esse app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produto não encontrado' });
    }
});
Faça algum tipo de analogia, para que todos entendam isso.
15) Esse app.post('/products', (req, res) => {. É uma função? O que é essa flexinha (=>)?
16) Para que serve isso?
     app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

17) Para que serve isso? É importante?
 process.on('SIGINT', () => {
    saveDataToCSV();
    process.exit();
});
No server.js
18) Têm a function loadDataFromCSV() {. Explique isso de modo simples (para humanos leigos entenderem).
19) O que são rotas no servidor? O que tem haver com o express?
20) Explique o que é o cors. Para que serve? 