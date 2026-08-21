// OCULTAR PRELOADER (COM TRAVA DE SEGURANÇA)
function esconderPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('oculto')) {
        preloader.classList.add('oculto');
    }
}

// Tenta esconder 1.8s após o carregamento total
window.addEventListener('load', function() {
    setTimeout(esconderPreloader, 1800);
});

// Trava de segurança: oculta após 3.5s mesmo se algo falhar ao carregar
setTimeout(esconderPreloader, 3500);

// EXIBIR/OCULTAR CAMPO DE ACOMPANHANTES
function toggleAcompanhantes(valor) {
    const groupQtd = document.getElementById('group-quantidade');
    if (groupQtd) {
        groupQtd.style.display = (valor === 'Sim') ? 'block' : 'none';
    }
}

// CONECTAR FORMULÁRIO À PLANILHA (VIA GOOGLE APPS SCRIPT)
const scriptURL = 'https://script.google.com/macros/s/AKfycbz_KnptxQDjhBH5RGjPDESDqwfOESWHxMrUEXIInIPOz3SfU9DO-nUO60rx4qnwFy5JKg/exec';
const form = document.getElementById('rsvp-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Enviando...';

        fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors',
            body: new FormData(form)
        })
        .then(() => {
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