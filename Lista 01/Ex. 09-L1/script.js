const lista = document.getElementById("lista");
const input = document.getElementById("novoItem");
const addBtn = document.getElementById("addBtn");

// Lista inicial de 5 frutas
let itens = ["Maçã", "Banana", "Laranja", "Uva", "Abacaxi"];

function atualizarLista() {
    lista.innerHTML = ""; // Limpa a lista antes de atualizar
    itens.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", () => removerItem(index));
        lista.appendChild(li);
    });
}

function adicionarItem() {
    let novoItem = input.value.trim();
    if (novoItem) {
        itens.push(novoItem);
        input.value = "";
        atualizarLista();
    }
}

function removerItem(index) {
    itens.splice(index, 1);
    atualizarLista();
}

addBtn.addEventListener("click", adicionarItem);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") adicionarItem();
});

// Inicializa a lista
atualizarLista();
