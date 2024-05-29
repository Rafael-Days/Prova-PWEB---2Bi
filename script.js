const botaoAbrirFiltro = document.getElementById('abrir-filtro');

const botaoFiltro = document.getElementById('button-filtro');

const closeButton = document.getElementById('close-button')

const dialogF = document.getElementById('dialog-filtro')

const header = document.getElementById("header")

//URL e Main
const apiUrl = "https://servicodados.ibge.gov.br/api/v3/noticias?qtd=10"

// Obtém o valor do campo de busca
//const termoBusca = document.getElementById("search").value;

//
const main = document.querySelector("main")

//Header

// Adiciona um event listener para abrir o modal quando o botão for clicado
botaoAbrirFiltro.addEventListener('click', () => {
    dialogF.showModal()
});

// Adiciona um event listener para fechar o modal quando o botão dentro do modal for clicado
closeButton.addEventListener('click', () => {
    dialogF.close();
});

//Main

async function getBuscaData(termoBusca) {
    try {
        const apiUrlSearch = `https://servicodados.ibge.gov.br/api/v3/noticias/?busca=${termoBusca}`;
        const response = await fetch(apiUrlSearch);
        const jsonDataSearch = await response.json();

        if (jsonDataSearch.items && jsonDataSearch.items.length > 0) {
            // Se houver resultados, atualiza o conteúdo principal
            updateMainContent(jsonDataSearch);
        } else {
            // Se não houver resultados, exibe uma mensagem de alerta
            semBusca()
        }
    } catch (error) {
        console.error("Ocorreu um erro ao buscar:", error);
    }
};

header.addEventListener('click', function () {
    // Pegar a URL atual
    const urlAtual = window.location.href;
    // Remover a parte da URL após o caminho base
    const urlSemSearch = urlAtual.split('?')[0];
    // Redirecionar para a URL sem a parte da busca
    window.location.href = urlSemSearch;
});

function semBusca() {
    const divSB = document.createElement('div')
    const pSB = document.createElement('p')
    const pInicio = document.createElement('p')
    divSB.setAttribute('id', 'divSB');
    pSB.setAttribute('id', 'pSB');
    pInicio.setAttribute('id', 'pInicio');

    pSB.textContent = 'Nenhum resultado encontrado para a busca.'
    pInicio.textContent = 'Clique Aqui para voltar ao Início'

    // Adicionando um evento de clique ao elemento pInicio
    pInicio.addEventListener('click', function () {
        // Pegar a URL atual
        const urlAtual = window.location.href;
        // Remover a parte da URL após o caminho base
        const urlSemSearch = urlAtual.split('?')[0];
        // Redirecionar para a URL sem a parte da busca
        window.location.href = urlSemSearch;
    });

    divSB.appendChild(pSB)
    divSB.appendChild(pInicio)
    main.appendChild(divSB)
}



document.addEventListener('DOMContentLoaded', () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const termoBusca = urlSearchParams.get('search');

    if (termoBusca) {
        // Se houver um termo de busca na URL, preenche o campo de busca com esse valor
        document.getElementById("search").value = termoBusca;
        // Em seguida, você pode realizar a busca com base nesse termo de busca, se necessário
        getBuscaData(termoBusca);
    } else {
        // Se não houver um termo de busca na URL, você pode executar alguma outra ação (por exemplo, chamar asyncFoo)
        asyncFoo();
    }
});


async function asyncFoo() {

    try {
        const fetchedData = await fetch(apiUrl);
        const jsonData = await fetchedData.json();

        updateMainContent(jsonData);

    } catch (e) {
        main.innerHTML = `
            <div class="div">
                <h2>${JSON.stringify(e)}</h2>
            </div>
        `;
        console.log(e.message);
    }
}

function updateMainContent(data) {
    let html = '';
//<img src="${data.items[i].imagens}" alt="Imagem da Notícia"/>
    for (let i = 0; i < 10; i++) {

        const imagemObjeto = JSON.parse(data.items[i].imagens);

        const caminhoDaImagem = imagemObjeto.image_intro || imagemObjeto.image_fulltext;

        html += `
        <div class="div">
            <ul>
                <li>
                    <img src="${caminhoDaImagem}" alt="Imagem da Notícia"/>
                    <h2>${data.items[i].titulo}</h2>
                    <p>${data.items[i].introducao}</p>
                    <a href="${data.items[i].link}" target="_blank">${data.items[i].link}</a>
                </li>
            </ul>
        </div>
        `;

    }
    main.innerHTML = html;
}