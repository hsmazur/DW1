function atualizarRelogio() {
    let agora = new Date();
    let horas = agora.getHours().toString().padStart(2, '0');
    let minutos = agora.getMinutes().toString().padStart(2, '0');
    let segundos = agora.getSeconds().toString().padStart(2, '0');
    
    document.getElementById("relogio").textContent = `${horas}:${minutos}:${segundos}`;
}

// Atualiza a cada segundo
setInterval(atualizarRelogio, 1000);

// Atualiza imediatamente ao carregar a página
atualizarRelogio();
