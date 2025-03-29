document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();

    let catetoA = document.getElementById("catetoA");
    let catetoB = document.getElementById("catetoB");
    let errorA = document.getElementById("errorA");
    let errorB = document.getElementById("errorB");
    let resultado = document.getElementById("resultado");

    // Resetando estilos e mensagens
    catetoA.classList.remove("error");
    catetoB.classList.remove("error");
    errorA.textContent = "";
    errorB.textContent = "";
    resultado.textContent = "";

    let a = parseFloat(catetoA.value);
    let b = parseFloat(catetoB.value);
    let valido = true;

    // Validações
    if (isNaN(a) || a <= 0) {
        errorA.textContent = "Informe um número válido para A";
        catetoA.classList.add("error");
        valido = false;
    }
    if (isNaN(b) || b <= 0) {
        errorB.textContent = "Informe um número válido para B";
        catetoB.classList.add("error");
        valido = false;
    }

    if (valido) {
        let hipotenusa = Math.sqrt(a * a + b * b).toFixed(2);
        resultado.textContent = `Hipotenusa: ${hipotenusa}`;
    }
});
