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

// TELA DE CARREGAMENTO (PRELOADER)
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function () {
            preloader.style.display = 'none';
        }, 500);
    }
});

// EXIBIR / OCULTAR CAMPO DE ACOMPANHANTES
function toggleAcompanhantes(valor) {
    const groupQtd = document.getElementById('group-quantidade');
    if (groupQtd) {
        groupQtd.style.display = (valor.includes('Sim')) ? 'block' : 'none';
    }
}

// ENVIO DO FORMULÁRIO E REDIRECIONAMENTO GRATUITO
const rsvpForm = document.getElementById('rsvp-form'); // Verifique se o ID do seu <form> é 'rsvp-form'

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Pega o campo de presença
        const campoPresenca = document.getElementById('presenca'); // Verifique se o ID do <select> ou <input> é 'presenca'
        const valorPresenca = campoPresenca ? campoPresenca.value.toLowerCase().trim() : '';

        const containerMensagem = document.querySelector('.form-container');

        // Confere se o valor contém palavras de confirmação
        const confirmou = valorPresenca.includes('sim') || 
                          valorPresenca.includes('confirm') || 
                          valorPresenca.includes('vou') || 
                          valorPresenca === 'yes' ||
                          valorPresenca === '1';

        let icone = '';
        let titulo = '';
        let texto = '';

        if (confirmou) {
            icone = '🎉';
            titulo = 'Presença Confirmada!';
            texto = 'Muito obrigado por confirmar! Mal podemos esperar para comemorar esse momento tão especial do Chá do Dominic com você! 🥳💙';
        } else {
            icone = '🩵';
            titulo = 'Resposta Registrada!';
            texto = 'Puxa, sentimos muito que você não poderá estar conosco nesse dia. Agradecemos muito o carinho e por nos avisar! 💌✨';
        }

        // Exibe a mensagem correta
        containerMensagem.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 3rem; margin-bottom: 10px;">${icone}</div>
                <h3 style="color: var(--azul-escuro); font-size: 1.8rem; margin-bottom: 15px; font-family: 'Quicksand', sans-serif;">${titulo}</h3>
                <p style="color: var(--cinza-texto); font-size: 1.05rem; line-height: 1.6; margin-bottom: 25px; font-family: 'Nunito', sans-serif;">${texto}</p>
                <a href="index.html" class="btn-principal" style="display: inline-block; text-decoration: none;">← Voltar ao site</a>
            </div>
        `;
    });
}