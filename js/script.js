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

// EXIBIR / OCULTAR CAMPO DE ACOMPANHANTES
function toggleAcompanhantes(valor) {
    const groupQtd = document.getElementById('group-quantidade');
    if (groupQtd) {
        groupQtd.style.display = (valor.includes('Sim')) ? 'block' : 'none';
    }
}