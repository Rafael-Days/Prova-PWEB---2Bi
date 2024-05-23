const botaoAbrirFiltro = document.getElementById('abrir-filtro');

const botaoFiltro = document.getElementById('button-filtro');

const closeButton = document.getElementById('close-button')

const dialogF = document.getElementById('dialog-filtro')

// Adiciona um event listener para abrir o modal quando o botão for clicado
botaoAbrirFiltro.addEventListener('click', () => {
    alert('isso')
    dialogF.showModal()
});

// Adiciona um event listener para fechar o modal quando o botão dentro do modal for clicado
closeButton.addEventListener('click', () => {
    dialogF.close();
});
