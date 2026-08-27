/*
  ========================================================
  Projeto:Chá do Dominic
  Desenvolvido por:Emanuelle Ávila Bairros
  GitHub:https://github.com/Manu21avila
  Todos os direitos de código reservamos ao autor.
  ========================================================
*/

// ==========================================
// CONFIGURAÇÕES GERAIS
// ==========================================

// Endereço do site usado no compartilhamento pelo WhatsApp.
const URL_DO_SITE = 'https://manu21avila.github.io/cha-do-dominic/';


// ==========================================
// MENU DE NAVEGAÇÃO
// Desktop: menu horizontal
// Mobile: menu vertical com hambúrguer
// ==========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {

    hamburger.addEventListener('click', () => {

        const menuAberto = hamburger.classList.toggle('active');

        navMenu.classList.toggle('active');

        hamburger.setAttribute(
            'aria-label',
            menuAberto ? 'Fechar menu' : 'Abrir menu'
        );

        hamburger.setAttribute(
            'aria-expanded',
            menuAberto ? 'true' : 'false'
        );
    });


    // Fecha o menu ao clicar em um link.
    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            hamburger.setAttribute('aria-label', 'Abrir menu');
            hamburger.setAttribute('aria-expanded', 'false');
        });

    });
}

// ==========================================
// PRELOADER
// ==========================================

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 800); // Aguarda 800ms para dar tempo de visualizar a animação
});

// ==========================================
// CONTAGEM REGRESSIVA DOS EVENTOS
// Cada painel possui seu próprio data-date.
// ==========================================

const paineisEvento = document.querySelectorAll('.painel-evento');

function atualizarContagens() {

    paineisEvento.forEach(painel => {

        const dataEvento = new Date(
            painel.dataset.date
        ).getTime();

        const agora = Date.now();

        const diferenca = dataEvento - agora;

        const elDias = painel.querySelector('[data-unit="dias"]');
        const elHoras = painel.querySelector('[data-unit="horas"]');
        const elMinutos = painel.querySelector('[data-unit="minutos"]');
        const elSegundos = painel.querySelector('[data-unit="segundos"]');


        if (diferenca > 0) {

            const dias = Math.floor(
                diferenca / (1000 * 60 * 60 * 24)
            );

            const horas = Math.floor(
                (diferenca % (1000 * 60 * 60 * 24))
                / (1000 * 60 * 60)
            );

            const minutos = Math.floor(
                (diferenca % (1000 * 60 * 60))
                / (1000 * 60)
            );

            const segundos = Math.floor(
                (diferenca % (1000 * 60))
                / 1000
            );


            if (elDias) {
                elDias.textContent = String(dias).padStart(2, '0');
            }

            if (elHoras) {
                elHoras.textContent = String(horas).padStart(2, '0');
            }

            if (elMinutos) {
                elMinutos.textContent = String(minutos).padStart(2, '0');
            }

            if (elSegundos) {
                elSegundos.textContent = String(segundos).padStart(2, '0');
            }

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
// ABAS DOS EVENTOS
// Chá de Bênçãos / Entreveiro de Fraldas
// ==========================================

const tabBotoes = document.querySelectorAll('.tab-evento-btn');

function ativarAba(nomeEvento) {

    tabBotoes.forEach(botao => {

        const ativo = botao.dataset.evento === nomeEvento;

        botao.classList.toggle('active', ativo);

        botao.setAttribute(
            'aria-selected',
            ativo ? 'true' : 'false'
        );
    });


    paineisEvento.forEach(painel => {

        const painelAtivo =
            painel.id === `painel-${nomeEvento}`;

        painel.classList.toggle(
            'active',
            painelAtivo
        );
    });
}


tabBotoes.forEach(botao => {

    botao.addEventListener('click', () => {

        ativarAba(botao.dataset.evento);

    });

});


// ==========================================
// BOTÕES "CONFIRMAR PRESENÇA"
// Dentro dos painéis dos eventos.
// ==========================================

const botoesConfirmarPainel =
    document.querySelectorAll('.btn-confirmar-painel');

const selectEventoRsvp =
    document.getElementById('evento-rsvp');

botoesConfirmarPainel.forEach(botao => {

    botao.addEventListener('click', () => {

        if (selectEventoRsvp) {

            selectEventoRsvp.value =
                botao.dataset.eventoAlvo;
        }


        const destino =
            document.getElementById('confirmacao');

        if (destino) {

            destino.scrollIntoView({
                behavior: 'smooth'
            });

        }

    });

});


// ==========================================
// PRELOADER
// ==========================================

window.addEventListener('load', () => {

    const preloader =
        document.getElementById('preloader');

    if (!preloader) return;


    preloader.style.opacity = '0';


    setTimeout(() => {

        preloader.style.display = 'none';

    }, 500);

});


// ==========================================
// CAMPO DE QUANTIDADE DE PESSOAS
// Mostra somente quando a pessoa confirma presença.
// ==========================================

const selectPresenca =
    document.getElementById('presenca');

const groupQuantidade =
    document.getElementById('group-quantidade');


function atualizarCampoQuantidade() {

    if (!selectPresenca || !groupQuantidade) {
        return;
    }


    const vaiComparecer =
        selectPresenca.value === 'sim';


    groupQuantidade.style.display =
        vaiComparecer ? 'flex' : 'none';
}


if (selectPresenca && groupQuantidade) {

    // Estado inicial.
    atualizarCampoQuantidade();


    selectPresenca.addEventListener(
        'change',
        atualizarCampoQuantidade
    );

}


// ==========================================
// ENVIO DO FORMULÁRIO RSVP
// ==========================================

const rsvpForm =
    document.getElementById('rsvp-form');


if (rsvpForm) {

    rsvpForm.addEventListener(
        'submit',
        async function (event) {

            event.preventDefault();


            const formData =
                new FormData(rsvpForm);

            const actionUrl =
                rsvpForm.getAttribute('action');


            const campoPresenca =
                document.getElementById('presenca');

            const valorPresenca =
                campoPresenca
                    ? campoPresenca.value
                    : '';


            const campoEvento =
                document.getElementById('evento-rsvp');

            const valorEvento =
                campoEvento
                    ? campoEvento.value
                    : '';


            const confirmou =
                valorPresenca === 'sim';


            const containerMensagem =
                document.querySelector('.form-container');


            if (!containerMensagem || !actionUrl) {
                return;
            }


            // ------------------------------------------
            // MENSAGEM DE ENVIO
            // ------------------------------------------

            containerMensagem.innerHTML = `
                <div class="mensagem-formulario">
                    <p>
                        Enviando sua resposta...
                    </p>
                </div>
            `;


            try {

                const resposta = await fetch(
                    actionUrl,
                    {
                        method: 'POST',

                        body: formData,

                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                );


                // ------------------------------------------
                // VERIFICAÇÃO REAL DO FORMSPREE
                // ------------------------------------------

                if (!resposta.ok) {

                    throw new Error(
                        `Erro HTTP: ${resposta.status}`
                    );

                }


                // ------------------------------------------
                // RESPOSTA DE SUCESSO
                // ------------------------------------------

                const nomeEvento =
                    valorEvento || 'o Chá do Dominic';


                if (confirmou) {

                    dispararConfete();


                    containerMensagem.innerHTML = `
                        <div class="mensagem-formulario sucesso">

                            <div class="icone-mensagem">
                                🎉
                            </div>

                            <h3>
                                Presença Confirmada!
                            </h3>

                            <p>
                                Muito obrigado por confirmar!
                                Mal podemos esperar para comemorar
                                ${nomeEvento} com você! 🥳💙
                            </p>

                            <a
                                href="#inicio"
                                class="btn-principal"
                            >
                                ← Voltar ao início
                            </a>

                        </div>
                    `;

                } else {

                    containerMensagem.innerHTML = `
                        <div class="mensagem-formulario sucesso">

                            <div class="icone-mensagem">
                                🩵
                            </div>

                            <h3>
                                Resposta Registrada!
                            </h3>

                            <p>
                                Puxa, sentimos muito que você não
                                poderá estar conosco nesse dia.
                                Agradecemos muito o carinho e por
                                nos avisar! 💌✨
                            </p>

                            <a
                                href="#inicio"
                                class="btn-principal"
                            >
                                ← Voltar ao início
                            </a>

                        </div>
                    `;
                }


                // Volta o scroll para a mensagem.
                containerMensagem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });


            } catch (erro) {

                console.error(
                    'Erro no envio do formulário:',
                    erro
                );


                containerMensagem.innerHTML = `
                    <div class="mensagem-formulario erro">

                        <div class="icone-mensagem">
                            😔
                        </div>

                        <h3>
                            Ops! Ocorreu um erro.
                        </h3>

                        <p>
                            Não conseguimos enviar sua confirmação
                            neste momento. Por favor, tente novamente.
                        </p>

                        <button
                            type="button"
                            class="btn-principal"
                            id="tentarNovamente"
                        >
                            Tentar Novamente
                        </button>

                    </div>
                `;


                const tentarNovamente =
                    document.getElementById(
                        'tentarNovamente'
                    );


                if (tentarNovamente) {

                    tentarNovamente.addEventListener(
                        'click',
                        () => {

                            window.location.reload();

                        }
                    );

                }

            }

        }
    );

}


// ==========================================
// CONFETE
// ==========================================

function dispararConfete() {

    if (typeof confetti !== 'function') {
        return;
    }


    const cores = [
        '#4d82b8',
        '#2b4c6f',
        '#eaf2f8',
        '#ffffff'
    ];


    confetti({
        particleCount: 120,
        spread: 80,
        origin: {
            y: 0.6
        },
        colors: cores
    });


    setTimeout(() => {

        confetti({
            particleCount: 60,
            angle: 60,
            spread: 70,
            origin: {
                x: 0,
                y: 0.6
            },
            colors: cores
        });


        confetti({
            particleCount: 60,
            angle: 120,
            spread: 70,
            origin: {
                x: 1,
                y: 0.6
            },
            colors: cores
        });

    }, 250);
}


// ==========================================
// MENU — SCROLL SPY
// Destaca automaticamente a seção atual.
// ==========================================

const secoesComNav =
    document.querySelectorAll('section[id]');

const linksDoMenu =
    document.querySelectorAll('.nav-link');


if (
    secoesComNav.length &&
    linksDoMenu.length &&
    'IntersectionObserver' in window
) {

    const observerMenu =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute('id');


                    linksDoMenu.forEach(link => {

                        const ativo =
                            link.getAttribute('href') ===
                            `#${id}`;


                        link.classList.toggle(
                            'active',
                            ativo
                        );

                    });

                });

            },
            {
                rootMargin: '-45% 0px -45% 0px',
                threshold: 0
            }
        );


    secoesComNav.forEach(secao => {

        observerMenu.observe(secao);

    });

}


// ==========================================
// ANIMAÇÃO REVEAL
// ==========================================

const elementosReveal =
    document.querySelectorAll('.reveal');


if (
    elementosReveal.length &&
    'IntersectionObserver' in window
) {

    const observerReveal =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        'visivel'
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        );


    elementosReveal.forEach(elemento => {

        observerReveal.observe(elemento);

    });

}


// ==========================================
// GALERIA DE FOTOS — CARROSSEL
// ==========================================

const carouselContainer =
    document.getElementById(
        'carouselContainer'
    );

const prevBtn =
    document.getElementById('prevBtn');

const nextBtn =
    document.getElementById('nextBtn');


if (
    carouselContainer &&
    prevBtn &&
    nextBtn
) {

    nextBtn.addEventListener(
        'click',
        () => {

            carouselContainer.scrollBy({
                left: 310,
                behavior: 'smooth'
            });

        }
    );


    prevBtn.addEventListener(
        'click',
        () => {

            carouselContainer.scrollBy({
                left: -310,
                behavior: 'smooth'
            });

        }
    );

}


// ==========================================
// COPIAR ENDEREÇO
// ==========================================

const botoesCopiar =
    document.querySelectorAll('.btn-copiar');


botoesCopiar.forEach(botao => {

    botao.addEventListener(
        'click',
        async () => {

            const endereco =
                botao.dataset.endereco || '';

            const textoOriginal =
                botao.textContent;


            try {

                await navigator.clipboard.writeText(
                    endereco
                );


                botao.textContent =
                    '✅ Copiado!';

                botao.classList.add(
                    'copiado'
                );


            } catch (erro) {

                console.error(
                    'Erro ao copiar endereço:',
                    erro
                );


                botao.textContent =
                    'Não foi possível copiar';

            }


            setTimeout(() => {

                botao.textContent =
                    textoOriginal;

                botao.classList.remove(
                    'copiado'
                );

            }, 2000);

        }
    );

});


// ==========================================
// COMPARTILHAR NO WHATSAPP
// ==========================================

const botoesWhatsapp =
    document.querySelectorAll('.btn-whatsapp');


botoesWhatsapp.forEach(botao => {

    const evento =
        botao.dataset.eventoShare || '';

    const dataEvento =
        botao.dataset.dataShare || '';

    const endereco =
        botao.dataset.enderecoShare || '';


    const mensagem =
        `Oi! Vim te chamar para o ${evento} do Dominic 💙\n\n` +
        `🗓️ ${dataEvento}\n` +
        `📍 ${endereco}\n\n` +
        `Confirme sua presença e veja todos os detalhes aqui: ` +
        `${URL_DO_SITE}`;


    botao.href =
        'https://wa.me/?text=' +
        encodeURIComponent(mensagem);

});

console.log(
    "%c Desenvolvido por Emanuelle Ávila Bairros %c https://github.com/Manu21avila ",
    "background: #4d82b8; color: #fff; padding: 5px 10px; border-radius: 4px 0 0 4px; font-weight: bold;",
    "background: #2b4c6f; color: #fff; padding: 5px 10px; border-radius: 0 4px 4px 0;"
);