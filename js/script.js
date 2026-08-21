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

// OCULTAR PRELOADER COM TEMPO MÍNIMO DE EXIBIÇÃO
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Aguarda 1.5 segundos antes de iniciar o efeito de sumir
        setTimeout(function() {
            preloader.classList.add('oculto');
        }, 1500); 
    }
});

// EXIBIR/OCULTAR CAMPO DE ACOMPANHANTES
function toggleAcompanhantes(valor) {
    const groupQtd = document.getElementById('group-quantidade');
    if (valor === 'Sim') {
        groupQtd.style.display = 'block';
    } else {
        groupQtd.style.display = 'none';
    }
}

// CONECTAR FORMULÁRIO À PLANILHA (VIA GOOGLE APPS SCRIPT)
const scriptURL = 'https://script.google.com/macros/s/AKfycbz_KnptxQDjhBH5RGjPDESDqwfOESWHxMrUEXlInlPOz3SfU9DO-nUO60rx4qnwFy5JKg/exec'; // mantenha a sua URL do Apps Script aqui
const form = document.getElementById('rsvp-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Enviando...';

        // Prepara os dados do formulário
        const formData = new FormData(form);
        const data = new URLSearchParams(formData);

        fetch(scriptURL, { 
            method: 'POST', 
            body: data 
        })
        .then(response => {
            alert('Obrigado! Sua resposta foi salva com sucesso! 🎉');
            form.reset();
            btn.disabled = false;
            btn.innerText = 'Enviar Confirmação';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Sua resposta foi enviada! Obrigado por confirmar.');
            form.reset();
            btn.disabled = false;
            btn.innerText = 'Enviar Confirmação';
        });
    });
}