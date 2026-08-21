// EXECUTA ASSIM QUE O HTML FOR CARREGADO
document.addEventListener('DOMContentLoaded', function () {
    const preloader = document.getElementById('preloader');

    // Remove o preloader após 1.8 segundos
    setTimeout(function () {
        if (preloader) {
            preloader.classList.add('oculto');
        }
    }, 1800);
});

// FUNÇÃO PARA EXIBIR/OCULTAR CAMPO DE ACOMPANHANTES
function toggleAcompanhantes(valor) {
    const groupQtd = document.getElementById('group-quantidade');
    if (groupQtd) {
        groupQtd.style.display = (valor === 'Sim') ? 'block' : 'none';
    }
}

// INTEGRAÇÃO DO FORMULÁRIO COM O GOOGLE SHEETS
const scriptURL = 'https://script.google.com/macros/s/AKfycbz_KnptxQDjhBH5RGjPDESDqwfOESWHxMrUEXIInIPOz3SfU9DO-nUO60rx4qnwFy5JKg/exec';
const form = document.getElementById('rsvp-form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Enviando...';

        const data = new URLSearchParams(new FormData(form));

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        })
        .then(function () {
            alert('Obrigado! Sua resposta foi salva com sucesso! 🎉');
            form.reset();
            btn.disabled = false;
            btn.innerText = 'Enviar Confirmação';
        })
        .catch(function (error) {
            console.error('Erro:', error);
            alert('Resposta registrada! Obrigado por confirmar.');
            form.reset();
            btn.disabled = false;
            btn.innerText = 'Enviar Confirmação';
        });
    });
}

// CONTAGEM REGRESSIVA
// Defina a data do evento no formato: YYYY-MM-DDTHH:mm:ss (Ex: 2026-10-15T15:00:00)
const dataEvento = new Date('2026-11-22T15:00:00').getTime();

function atualizarContagem() {
    const agora = new Date().getTime();
    const diferenca = dataEvento - agora;

    if (diferenca > 0) {
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        const elDias = document.getElementById('dias');
        const elHoras = document.getElementById('horas');
        const elMin = document.getElementById('minutos');
        const elSeg = document.getElementById('segundos');

        if (elDias) elDias.innerText = dias < 10 ? '0' + dias : dias;
        if (elHoras) elHoras.innerText = horas < 10 ? '0' + horas : horas;
        if (elMin) elMin.innerText = minutos < 10 ? '0' + minutos : minutos;
        if (elSeg) elSeg.innerText = segundos < 10 ? '0' + segundos : segundos;
    }
}

// Atualiza a cada 1 segundo
setInterval(atualizarContagem, 1000);
atualizarContagem();