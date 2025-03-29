document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let a = document.getElementById("a");
    let b = document.getElementById("b");
    let c = document.getElementById("c");
    let errorA = document.getElementById("errorA");
    let errorB = document.getElementById("errorB");
    let errorC = document.getElementById("errorC");
    let resultado = document.getElementById("resultado");

    // Resetando estilos e mensagens
    a.classList.remove("error");
    b.classList.remove("error");
    c.classList.remove("error");
    errorA.textContent = "";
    errorB.textContent = "";
    errorC.textContent = "";
    resultado.textContent = "";

    let valA = parseFloat(a.value);
    let valB = parseFloat(b.value);
    let valC = parseFloat(c.value);
    let valido = true;

    // Validações
    if (isNaN(valA) || valA === 0) {
        errorA.textContent = "A deve ser um número diferente de 0";
        a.classList.add("error");
        valido = false;
    }
    if (isNaN(valB)) {
        errorB.textContent = "B deve ser um número";
        b.classList.add("error");
        valido = false;
    }
    if (isNaN(valC)) {
        errorC.textContent = "C deve ser um número";
        c.classList.add("error");
        valido = false;
    }

    if (valido) {
        let delta = valB * valB - 4 * valA * valC;

        if (delta < 0) {
            resultado.textContent = "Não existem raízes reais.";
        } else {
            let x1 = (-valB + Math.sqrt(delta)) / (2 * valA);
            let x2 = (-valB - Math.sqrt(delta)) / (2 * valA);
            resultado.textContent = `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
        }
    }
});
