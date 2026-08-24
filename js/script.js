// ==========================================
// ENDEREÇO DO SITE — usado no botão de WhatsApp.
// Troque pela URL real assim que o site estiver publicado
// (ex.: GitHub Pages, domínio próprio, etc.)
// ==========================================
const URL_DO_SITE = 'https://manu21avila.github.io/cha-do-dominic/';

// Lógica do Menu Hambúrguer para Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    // Abrir/Fechar menu ao clicar no botão
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar o menu automaticamente ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==========================================
// CONTAGEM REGRESSIVA — UMA PARA CADA EVENTO
// Cada .painel-evento tem seu próprio data-date
// e seus próprios elementos [data-unit] dentro dele.
// ==========================================
const paineisEvento = document.querySelectorAll('.painel-evento');

function atualizarContagens() {
    paineisEvento.forEach(painel => {
        const dataEvento = new Date(painel.dataset.date).getTime();
        const agora = new Date().getTime();
        const diferenca = dataEvento - agora;

        const elDias = painel.querySelector('[data-unit="dias"]');
        const elHoras = painel.querySelector('[data-unit="horas"]');
        const elMin = painel.querySelector('[data-unit="minutos"]');
        const elSeg = painel.querySelector('[data-unit="segundos"]');

        if (diferenca > 0) {
            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

            if (elDias) elDias.innerText = dias < 10 ? '0' + dias : dias;
            if (elHoras) elHoras.innerText = horas < 10 ? '0' + horas : horas;
            if (elMin) elMin.innerText = minutos < 10 ? '0' + minutos : minutos;
            if (elSeg) elSeg.innerText = segundos < 10 ? '0' + segundos : segundos;
        } else {
            if (elDias) elDias.innerText = '00';
            if (elHoras) elHoras.innerText = '00';
            if (elMin) elMin.innerText = '00';
            if (elSeg) elSeg.innerText = '00';
        }
    });
}

setInterval(atualizarContagens, 1000);
atualizarContagens();

// ==========================================
// ABAS DE EVENTOS (Chá de Bênçãos / Entreveiro)
// ==========================================
const tabBotoes = document.querySelectorAll('.tab-evento-btn');

function ativarAba(nomeEvento) {
    tabBotoes.forEach(btn => {
        const ativo = btn.dataset.evento === nomeEvento;
        btn.classList.toggle('active', ativo);
        btn.setAttribute('aria-selected', ativo ? 'true' : 'false');
    });
    paineisEvento.forEach(painel => {
        painel.classList.toggle('active', painel.id === 'painel-' + nomeEvento);
    });
}

tabBotoes.forEach(btn => {
    btn.addEventListener('click', () => ativarAba(btn.dataset.evento));
});

// Botões "Confirmar presença" dentro de cada painel:
// rolam até o formulário e já pré-selecionam o evento certo.
const botoesConfirmarPainel = document.querySelectorAll('.btn-confirmar-painel');
const selectEventoRsvp = document.getElementById('evento-rsvp');

botoesConfirmarPainel.forEach(btn => {
    btn.addEventListener('click', () => {
        if (selectEventoRsvp) {
            selectEventoRsvp.value = btn.dataset.eventoAlvo;
        }
        const destino = document.getElementById('confirmacao');
        if (destino) destino.scrollIntoView({ behavior: 'smooth' });
    });
});

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
            groupQuantidade.style.display = 'flex';
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

        const campoEvento = document.getElementById('evento-rsvp');
        const valorEvento = campoEvento ? campoEvento.value : '';

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
            const nomeEvento = valorEvento || 'o Chá do Dominic';

            if (confirmou) {
                icone = '🎉';
                titulo = 'Presença Confirmada!';
                texto = `Muito obrigado por confirmar! Mal podemos esperar para comemorar ${nomeEvento} com você! 🥳💙`;
                dispararConfete();
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

// ==========================================
// CONFETE NA CONFIRMAÇÃO DE PRESENÇA
// ==========================================
function dispararConfete() {
    if (typeof confetti !== 'function') return;

    const cores = ['#4d82b8', '#2b4c6f', '#eaf2f8', '#ffffff'];

    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: cores
    });

    setTimeout(() => {
        confetti({
            particleCount: 60,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.6 },
            colors: cores
        });
        confetti({
            particleCount: 60,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.6 },
            colors: cores
        });
    }, 250);
}

// ==========================================
// MENU COM DESTAQUE AUTOMÁTICO (SCROLL SPY)
// ==========================================
const secoesComNav = document.querySelectorAll('section[id]');
const linksDoMenu = document.querySelectorAll('.nav-link');

if (secoesComNav.length && linksDoMenu.length) {
    const observerMenu = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                linksDoMenu.forEach(link => {
                    const alvo = link.getAttribute('href') === '#' + id;
                    link.classList.toggle('active', alvo);
                });
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    secoesComNav.forEach(secao => observerMenu.observe(secao));
}

// ==========================================
// ANIMAÇÃO SUAVE AO ROLAR (FADE-IN)
// ==========================================
const elementosReveal = document.querySelectorAll('.reveal');

if (elementosReveal.length) {
    const observerReveal = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visivel');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elementosReveal.forEach(el => observerReveal.observe(el));
}

// ==========================================
// GALERIA DE FOTOS — CARROSSEL CORRIGIDO
// ==========================================
const carouselContainer = document.getElementById('carouselContainer') || document.getElementById('galeria-carrossel');
const prevBtn = document.getElementById('prevBtn') || document.getElementById('galeria-prev');
const nextBtn = document.getElementById('nextBtn') || document.getElementById('galeria-next');

if (carouselContainer && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({ left: 310, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carouselContainer.scrollBy({ left: -310, behavior: 'smooth' });
    });
}

// ==========================================
// COPIAR ENDEREÇO
// ==========================================
document.querySelectorAll('.btn-copiar').forEach(botao => {
    botao.addEventListener('click', async () => {
        const endereco = botao.dataset.endereco || '';
        const textoOriginal = botao.textContent;

        try {
            await navigator.clipboard.writeText(endereco);
            botao.textContent = '✅ Copiado!';
            botao.classList.add('copiado');
        } catch (erro) {
            botao.textContent = 'Não foi possível copiar';
        }

        setTimeout(() => {
            botao.textContent = textoOriginal;
            botao.classList.remove('copiado');
        }, 2000);
    });
});

// ==========================================
// COMPARTILHAR NO WHATSAPP
// ==========================================
document.querySelectorAll('.btn-whatsapp').forEach(botao => {
    const evento = botao.dataset.eventoShare || '';
    const dataEvento = botao.dataset.dataShare || '';
    const endereco = botao.dataset.enderecoShare || '';

    const mensagem = `Oi! Vim te chamar para o ${evento} do Dominic 💙\n\n🗓️ ${dataEvento}\n📍 ${endereco}\n\nConfirme sua presença e veja todos os detalhes aqui: ${URL_DO_SITE}`;

    botao.href = 'https://wa.me/?text=' + encodeURIComponent(mensagem);
});