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

// ==========================================
    // 1. MOSTRAR / ESCONDER CAMPO DE QUANTIDADE
    // ==========================================
    const selectPresenca = document.getElementById('presenca');
    const groupQuantidade = document.getElementById('group-quantidade');

    if (selectPresenca && groupQuantidade) {
        selectPresenca.addEventListener('change', function () {
            const valor = this.value.toLowerCase().trim();
            const vaiComparecer = valor.includes('sim') || valor.includes('confirm') || valor.includes('vou') || valor === '1';

            if (vaiComparecer) {
                groupQuantidade.style.display = 'flex'; // ou 'block', conforme seu layout
            } else {
                groupQuantidade.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 2. ENVIO DO FORMULÁRIO E MENSAGEM FINAL
    // ==========================================
    const rsvpForm = document.getElementById('rsvp-form');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const actionUrl = this.getAttribute('action');

            const campoPresenca = document.getElementById('presenca');
            const valorPresenca = campoPresenca ? campoPresenca.value.toLowerCase().trim() : '';

            const confirmou = valorPresenca.includes('sim') || 
                              valorPresenca.includes('confirm') || 
                              valorPresenca.includes('vou') || 
                              valorPresenca === 'yes' ||
                              valorPresenca === '1';

            const containerMensagem = document.querySelector('.form-container');

            // Feedback de "Enviando..."
            containerMensagem.innerHTML = `
                <div style="text-align: center; padding: 30px;">
                    <p style="color: var(--azul-escuro); font-size: 1.1rem; font-weight: 600; font-family: 'Quicksand', sans-serif;">Enviando sua resposta...</p>
                </div>
            `;

            // Envio assíncrono para o e-mail
            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
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

                containerMensagem.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 3rem; margin-bottom: 10px;">${icone}</div>
                        <h3 style="color: var(--azul-escuro); font-size: 1.8rem; margin-bottom: 15px; font-family: 'Quicksand', sans-serif;">${titulo}</h3>
                        <p style="color: var(--cinza-texto); font-size: 1.05rem; line-height: 1.6; margin-bottom: 25px; font-family: 'Nunito', sans-serif;">${texto}</p>
                        <a href="index.html" class="btn-principal" style="display: inline-block; text-decoration: none;">← Voltar ao site</a>
                    </div>
                `;
            })
            .catch(error => {
                console.error('Erro no envio:', error);
                containerMensagem.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <h3 style="color: #c53030; font-size: 1.4rem; margin-bottom: 10px; font-family: 'Quicksand', sans-serif;">Ops! Ocorreu um erro ao enviar.</h3>
                        <p style="color: var(--cinza-texto); margin-bottom: 20px; font-family: 'Nunito', sans-serif;">Por favor, tente novamente ou entre em contato conosco.</p>
                        <a href="index.html" class="btn-principal" style="display: inline-block; text-decoration: none;">Tentar Novamente</a>
                    </div>
                `;
            });
        });
    }