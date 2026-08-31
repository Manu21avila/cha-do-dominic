/*
  ========================================================
  Projeto: Chá do Dominic
  Desenvolvido por: Emanuelle Ávila Bairros
  GitHub: https://github.com/Manu21avila
  ========================================================
*/

const URL_DO_SITE = 'https://manu21avila.github.io/cha-do-dominic/';
const ENDERECO_PADRAO = 'Salão de festas — Condomínio Ecoville · Av. Ecoville, 790 - Sarandi, Porto Alegre - RS';

// ==========================================
// PRELOADER & NAVEGAÇÃO
// ==========================================

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function fecharPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('preloader-hidden')) {
        preloader.classList.add('preloader-hidden');
    }
}

setTimeout(fecharPreloader, 1500);

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    setTimeout(fecharPreloader, 500);
});

// Menu Hambúrguer (Mobile)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        const menuAberto = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', menuAberto ? 'true' : 'false');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// ==========================================
// ABAS DOS EVENTOS (ENTREVEIRO / CHÁ) - FIX 1
// ==========================================

const tabBotoes = document.querySelectorAll('.tab-evento-btn');
const paineisEvento = document.querySelectorAll('.painel-evento');

function ativarAba(nomeEvento) {
    tabBotoes.forEach(botao => {
        const ativo = botao.dataset.evento === nomeEvento;
        botao.classList.toggle('active', ativo);
        botao.setAttribute('aria-selected', ativo ? 'true' : 'false');
    });

    paineisEvento.forEach(painel => {
        const painelAtivo = painel.id === `painel-${nomeEvento}`;
        painel.classList.toggle('active', painelAtivo);
        if (painelAtivo) {
            painel.style.display = 'block';
        } else {
            painel.style.display = 'none';
        }
    });
}

tabBotoes.forEach(botao => {
    botao.addEventListener('click', () => {
        if (botao.dataset.evento) {
            ativarAba(botao.dataset.evento);
        }
    });
});

// ==========================================
// CONTAGEM REGRESSIVA
// ==========================================

function atualizarContagens() {
    paineisEvento.forEach(painel => {
        const dataStr = painel.dataset.date;
        if (!dataStr) return;

        const dataEvento = new Date(dataStr).getTime();
        const agora = Date.now();
        const diferenca = dataEvento - agora;

        const elDias = painel.querySelector('[data-unit="dias"]');
        const elHoras = painel.querySelector('[data-unit="horas"]');
        const elMinutos = painel.querySelector('[data-unit="minutos"]');
        const elSegundos = painel.querySelector('[data-unit="segundos"]');

        if (diferenca > 0) {
            const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

            if (elDias) elDias.textContent = String(dias).padStart(2, '0');
            if (elHoras) elHoras.textContent = String(horas).padStart(2, '0');
            if (elMinutos) elMinutos.textContent = String(minutos).padStart(2, '0');
            if (elSegundos) elSegundos.textContent = String(segundos).padStart(2, '0');
        } else {
            if (elDias) elDias.textContent = '00';
            if (elHoras) elHoras.textContent = '00';
            if (elMinutos) elMinutos.textContent = '00';
            if (elSegundos) elSegundos.textContent = '00';
        }
    });
}

atualizarContagens();
setInterval(atualizarContagens, 1000);

// ==========================================
// BOTÕES DE CONFIRMAR PRESENÇA DA PÁGINA - FIX 2
// ==========================================

const botoesConfirmarGerais = document.querySelectorAll('.btn-confirmar-painel, [href="#confirmacao"], .btn-confirmar-evento');
const selectEventoRsvp = document.getElementById('evento-rsvp') || document.querySelector('select[name="evento"]');

botoesConfirmarGerais.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const eventoAlvo = botao.dataset.eventoAlvo;
        if (selectEventoRsvp && eventoAlvo) {
            selectEventoRsvp.value = eventoAlvo;
        }

        const secaoConfirmacao = document.getElementById('confirmacao') || document.querySelector('.secao-confirmacao');
        if (secaoConfirmacao) {
            e.preventDefault();
            secaoConfirmacao.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==========================================
// CAMPO QUANTIDADE DE PESSOAS (ESCONDER/EXIBIR) - FIX 4
// ==========================================

const selectPresenca = document.getElementById('presenca') || document.querySelector('select[name="presenca"]');
const groupQuantidade = document.getElementById('group-quantidade') || 
                          (document.querySelector('[name="quantidade"]') ? document.querySelector('[name="quantidade"]').closest('.form-group') : null);

function atualizarCampoQuantidade() {
    if (!selectPresenca || !groupQuantidade) return;
    
    // Mostra apenas se a opção selecionada for 'sim'
    const vaiComparecer = selectPresenca.value === 'sim';
    groupQuantidade.style.display = vaiComparecer ? 'flex' : 'none';
}

if (selectPresenca && groupQuantidade) {
    // Garante que inicie escondido
    groupQuantidade.style.display = 'none';
    selectPresenca.addEventListener('change', atualizarCampoQuantidade);
}

// ==========================================
// FORMULÁRIO DE RSVP (FORMSPREE) - FIX 3
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    const rsvpForm = document.getElementById('rsvp-form');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const form = this;
            const data = new FormData(form);
            const nomeInput = form.querySelector('[name="nome"]') || form.querySelector('#nome');
            const nome = nomeInput ? nomeInput.value : 'Convidado';
            
            const selectPresencaElem = document.getElementById('presenca') || form.querySelector('[name="presenca"]');
            const vaiComparecer = selectPresencaElem ? selectPresencaElem.value === 'sim' : true;

            fetch('https://formspree.io/f/meajdqpz', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    exibirSucesso(nome, vaiComparecer);
                    form.reset();
                    dispararConfete(); // Chama os confetes ao confirmar!
                } else {
                    alert("Ocorreu um erro ao enviar a confirmação. Tente novamente.");
                }
            }).catch(error => {
                console.error("Erro no Formspree:", error);
                alert("Erro de conexão ao enviar a resposta.");
            });
        });
    }
});

function exibirSucesso(nome, vaiComparecer) {
    const rsvpForm = document.getElementById('rsvp-form');
    if (!rsvpForm) return;

    const container = rsvpForm.closest('.form-container') || rsvpForm.parentElement;
    if (!container) return;

    const mensagemTexto = vaiComparecer
        ? `Muito obrigado por responder, <strong>${nome}</strong>! Mal podemos esperar para comemorar com você! 🥳💙`
        : `Obrigado por nos avisar, <strong>${nome}</strong>. Sentiremos sua falta! 💙`;

    container.innerHTML = `
        <div class="mensagem-sucesso-card" style="padding: 30px; text-align: center; width: 100%;">
            <div style="font-size: 3.5rem; margin-bottom: 10px;">${vaiComparecer ? '🎉' : '💙'}</div>
            <h3 style="margin-bottom: 10px; color: #2c3e50; font-size: 1.5rem;">${vaiComparecer ? 'Presença Confirmada!' : 'Resposta Registrada!'}</h3>
            <p style="margin-bottom: 20px; color: #555; line-height: 1.6;">${mensagemTexto}</p>
            <a href="#inicio" class="btn-principal" onclick="location.reload();" style="display:inline-block; padding: 10px 20px; text-decoration:none;">← Voltar ao início</a>
        </div>
    `;
}

// ==========================================
// EFEITO DE CONFETE (DISPARO CORRIGIDO) - FIX 3
// ==========================================

function dispararConfete() {
    if (typeof confetti !== 'function') {
        console.warn('Biblioteca de confete não carregada no HTML.');
        return;
    }

    const cores = ['#4d82b8', '#2b4c6f', '#eaf2f8', '#ffffff'];

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: cores
    });

    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: cores
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: cores
        });
    }, 200);
}

// ==========================================
// GALERIA DE FOTOS — CARROSSEL
// ==========================================

const carouselTrack = document.getElementById('carouselContainer') || 
                      document.getElementById('galeria-track') || 
                      document.querySelector('.galeria-track') ||
                      document.querySelector('.carousel-track');

const prevBtn = document.getElementById('prevBtn') || document.querySelector('.galeria-btn.prev');
const nextBtn = document.getElementById('nextBtn') || document.querySelector('.galeria-btn.next');

if (carouselTrack && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
}

// ==========================================
// MURAL DE RECADOS (FIREBASE)
// ==========================================

const recadoForm = document.getElementById('recado-form');
const muralTrack = document.getElementById('mural-recados-lista') || document.getElementById('lista-recados');

if (recadoForm) {
    recadoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nome = document.getElementById('recado-nome').value;
        const texto = document.getElementById('recado-texto').value;

        if (typeof db === 'undefined') {
            alert('Não foi possível conectar ao banco de dados no momento.');
            return;
        }

        try {
            await db.collection('recados').add({
                nome: nome,
                mensagem: texto,
                criadoEm: firebase.firestore.FieldValue.serverTimestamp()
            });

            recadoForm.reset();
            alert('Recadinho enviado com sucesso! 💙');
        } catch (erro) {
            console.error('Erro ao enviar recado:', erro);
            alert('Erro ao enviar recado. Tente novamente.');
        }
    });
}

function carregarRecados() {
    if (!muralTrack || typeof db === 'undefined') return;

    db.collection('recados')
      .orderBy('criadoEm', 'desc')
      .onSnapshot((snapshot) => {
          if (snapshot.empty) {
              muralTrack.innerHTML = '<p style="text-align:center; color:#666;">Seja o primeiro a deixar um recadinho! ✨</p>';
              return;
          }

          muralTrack.innerHTML = '';
          snapshot.forEach((doc) => {
              const recado = doc.data();
              adicionarRecadoNaTela(recado.nome || 'Anônimo', recado.mensagem || '');
          });
      });
}

function adicionarRecadoNaTela(nome, mensagem) {
    if (!muralTrack) return;

    const novoCard = document.createElement('div');
    novoCard.className = 'card-recadinho-horizontal card-recado';
    novoCard.innerHTML = `
        <div class="card-recadinho-header" style="display:flex; justify-content:space-between; align-items:center;">
            <span class="autor-nome"><strong>${nome}</strong></span>
            <span class="recadinho-coracao" style="color: #4d82b8; font-size: 1.1rem;">💙</span>
        </div>
        <p class="recadinho-texto" style="margin-top: 8px; color: #4a5568;">${mensagem}</p>
    `;

    muralTrack.appendChild(novoCard);
}

carregarRecados();

// ==========================================
// UTILITÁRIOS (COPIAR & WHATSAPP)
// ==========================================

const botoesCopiar = document.querySelectorAll('.btn-copiar, [id*="copiar"]');

botoesCopiar.forEach(botao => {
    botao.addEventListener('click', async (e) => {
        e.preventDefault();
        const endereco = botao.dataset.endereco || ENDERECO_PADRAO;
        const textoOriginal = botao.innerHTML;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(endereco);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = endereco;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            botao.innerHTML = '✅ Copiado!';
            setTimeout(() => {
                botao.innerHTML = textoOriginal;
            }, 2000);
        } catch (erro) {
            alert('Endereço: ' + endereco);
        }
    });
});

const botoesWhatsapp = document.querySelectorAll('.btn-whatsapp, [id*="whatsapp"]');

botoesWhatsapp.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const evento = botao.dataset.eventoShare || 'Chá do Dominic';
        const endereco = botao.dataset.enderecoShare || ENDERECO_PADRAO;

        const mensagem = 
            `Oi! Vem comemorar com a gente o ${evento}! 💙\n\n` +
            `📍 ${endereco}\n\n` +
            `Veja os detalhes e confirme sua presença aqui: ${URL_DO_SITE}`;

        const urlWhatsapp = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`;

        if (botao.tagName === 'A') {
            botao.href = urlWhatsapp;
            botao.target = '_blank';
        } else {
            e.preventDefault();
            window.open(urlWhatsapp, '_blank');
        }
    });
});