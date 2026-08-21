const dataDoEvento = new Date("November 22, 2026 15:00:00").getTime();

function atualizarContagem() {
    const agora = new Date().getTime();
    const distancia = dataDoEvento - agora;

    if (distancia < 0) {
        document.querySelector(".contador").innerHTML = "<h3>O grande dia chegou! 🎉</h3>";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
    document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
    document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
    document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
}

atualizarContagem();
setInterval(atualizarContagem, 1000);

document.getElementById('formPresenca').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Obrigado por confirmar sua presença no Chá do Dominic! 🎉💙');
    this.reset();
});

// OCULTAR PRELOADER APÓS CARREGAMENTO
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('oculto');
    }
});