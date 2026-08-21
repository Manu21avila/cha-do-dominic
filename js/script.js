// CONTAGEM REGRESSIVA (22/11/2026 às 15h)
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

setInterval(atualizarContagem, 1000);
atualizarContagem();

// EXIBIR / OCULTAR CAMPO DE ACOMPANHANTES
function toggleAcompanhantes(valor) {
    const groupQtd = document.getElementById('group-quantidade');
    if (groupQtd) {
        groupQtd.style.display = (valor.includes('Sim')) ? 'block' : 'none';
    }
}

// ENVIO DO FORMULÁRIO COM REDIRECIONAMENTO PRÓPRIO
const form = document.getElementById('rsvp-form');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede a tela padrão do Formspree

        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerText = 'Enviando...';

        const data = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Redireciona direto para a sua tela de obrigado gratuita
                window.location.href = 'obrigado.html';
            } else {
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente.');
                btn.disabled = false;
                btn.innerText = 'Enviar Confirmação';
            }
        })
        .catch(error => {
            alert('Ocorreu um erro na conexão. Tente novamente.');
            btn.disabled = false;
            btn.innerText = 'Enviar Confirmação';
        });
    });
}