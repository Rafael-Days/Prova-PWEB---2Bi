const botaoAbrirFiltro = document.getElementById('abrir-filtro');

const botaoFiltro = document.getElementById('button-filtro');

// Adiciona um event listener para abrir o modal quando o botão for clicado
botaoAbrirFiltro.addEventListener('click', () => {
    document.getElementById('dialog-filtro').showModal();
});

// Adiciona um event listener para fechar o modal quando o botão dentro do modal for clicado
botaoFiltro.addEventListener('click', () => {
    document.getElementById('dialog-filtro').close();
});
