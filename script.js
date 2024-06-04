const botaoAbrirFiltro = document.getElementById('abrir-filtro');

const botaoTipo = document.getElementById('button-tipo');

const closeButton = document.getElementById('close-button')

const dialogF = document.getElementById('dialog-filtro')

const header = document.getElementById("header")

//URL e Main
//const apiUrl = "https://servicodados.ibge.gov.br/api/v3/noticias?qtd=10&tipo=noticia"
const apiUrl = "https://servicodados.ibge.gov.br/api/v3/noticias?qtd=10"

//const termoBusca = document.getElementById("search").value;

//
const main = document.querySelector("main")

//Header

botaoAbrirFiltro.addEventListener('click', () => {
    dialogF.showModal()
});

closeButton.addEventListener('click', () => {
    dialogF.close();
});

//Main

async function getBuscaData() {
    try {
        var selectBoxTipo = document.getElementById("button-tipo");
        var selectBoxQtd = document.getElementById("button-qtd");
        
        var selectedValueTipo = selectBoxTipo.options[selectBoxTipo.selectedIndex].value;
        var selectedValueQtd = selectBoxQtd.options[selectBoxQtd.selectedIndex].value;

        // Obtém a string de busca da URL
        const queryString = window.location.search;

        // Remove o ponto de interrogação da string de busca e decodifica os caracteres especiais
        const termoBusca = decodeURIComponent(queryString.slice(1));

        // Atualiza a URL da API com os valores selecionados e o termo de busca, se houver
        const searchParams = new URLSearchParams();
        searchParams.append('tipo', selectedValueTipo);
        searchParams.append('qtd', selectedValueQtd);
        if (termoBusca) {
            searchParams.append('busca', termoBusca);
        }

        const apiUrlSearch = `https://servicodados.ibge.gov.br/api/v3/noticias/?${searchParams.toString()}`;
        
        const response = await fetch(apiUrlSearch);
        const jsonDataSearch = await response.json();

        if (jsonDataSearch.items && jsonDataSearch.items.length > 0) {
            // Se houver resultados, atualiza o conteúdo principal
            updateMainContent(jsonDataSearch);
        } else {
            // Se não houver resultados, exibe uma mensagem de alerta
            semBusca();
        }
    } catch (error) {
        console.error("Ocorreu um erro ao buscar:", error);
    }
}

/*
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
*/
//VOLTA AO INÍCIO, CLICANDO NO HEADER
header.addEventListener('click', function () {

    const urlAtual = window.location.href;

    const urlSemSearch = urlAtual.split('?')[0];

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

        getBuscaData(termoBusca);
    } else {
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

document.getElementById("form-filtro").addEventListener("submit", async function(event) {

    await handleChange();
});

async function handleChange() {
    try {
        var selectBoxTipo = document.getElementById("button-tipo");
        var selectBoxQtd = document.getElementById("button-qtd");
        var inputDe = document.getElementById("button-de");
        var inputAte = document.getElementById("button-ate");
        
        var selectedValueTipo = selectBoxTipo.options[selectBoxTipo.selectedIndex].value;
        var selectedValueQtd = selectBoxQtd.options[selectBoxQtd.selectedIndex].value;
        var deValue = inputDe.value;
        var ateValue = inputAte.value;

        // Obtém o termo de busca da URL, se houver
        const queryString = window.location.search;
        const searchTerm = decodeURIComponent(queryString.slice(1));

        // Atualiza a URL da API com os valores selecionados e o termo de busca, se houver
        const searchParams = new URLSearchParams();
        searchParams.append('tipo', selectedValueTipo);
        searchParams.append('qtd', selectedValueQtd);
        if (searchTerm) {
            searchParams.append('busca', searchTerm);
        }
        if (deValue) {
            searchParams.append('de', deValue);
        }
        if (ateValue) {
            searchParams.append('ate', ateValue);
        }

        const apiUrlSearch = `https://servicodados.ibge.gov.br/api/v3/noticias/?${searchParams.toString()}`;
        
        const response = await fetch(apiUrlSearch);
        const jsonDataSearch = await response.json();

        if (jsonDataSearch.items && jsonDataSearch.items.length > 0) {
            // Se houver resultados, atualiza o conteúdo principal
            updateMainContent(jsonDataSearch);
            
            // Atualiza a URL com os parâmetros do filtro
            const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
            window.history.pushState({}, '', newUrl);
        } else {
            // Se não houver resultados, exibe uma mensagem de alerta
            semBusca();
        }

        console.log("Data de Início (De):", deValue);
        console.log("Data de Término (Até):", ateValue);
    } catch (error) {
        console.error("Ocorreu um erro ao aplicar o filtro:", error);
    }
}



/*
function updateMainContent(data) {
    let html = '';
//<img src="${data.items[i].imagens}" alt="Imagem da Notícia"/>

    const imagensStringificadas = []

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
}*/

function updateMainContent(data) {
    let html = '';
    const imagensStringificadas = [];
    const apiUrl = 'https://servicodados.ibge.gov.br/api/v3/'; // URL base da API do IBGE

    if (data.items && data.items.length > 0) {
        const totalItems = Math.min(data.items.length, 10); 

        for (let i = 0; i < totalItems; i++) {
            const imagemObjeto = data.items[i].imagens; 

            if (imagemObjeto) {
                const caminhoDaImagemIntro = apiUrl + imagemObjeto;
                //const caminhoDaImagemFulltext = apiUrl + imagemObjeto.image_fulltext;

                imagensStringificadas.push(JSON.stringify(caminhoDaImagemIntro));

                html += `
                <div class="div">
                    <ul>
                        <li>
                            <a href="${caminhoDaImagemIntro}" target="_blank">
                                <img src="${caminhoDaImagemIntro}" alt="Imagem da Notícia Intro"/>
                            </a>
                            <h2>${data.items[i].titulo}</h2>
                            <p>${data.items[i].introducao}</p>
                            <a href="${data.items[i].link}" target="_blank">${data.items[i].link}</a>
                            <p class="dataPubli">${data.items[i].data_publicacao}</p>
                        </li>
                    </ul>
                </div>
                `;
            }
        }
    } else {
        semBusca();
    }

    main.innerHTML = html;

    console.log(JSON.stringify(imagensStringificadas)); // Aqui você tem as URLs das imagens em formato de string
}




