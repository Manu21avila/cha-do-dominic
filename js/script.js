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

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: new FormData(form)
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