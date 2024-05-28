const botaoAbrirFiltro = document.getElementById('abrir-filtro');

const botaoFiltro = document.getElementById('button-filtro');

const closeButton = document.getElementById('close-button')

const dialogF = document.getElementById('dialog-filtro')

const header = document.querySelector("header")

//URL e Main
const apiUrl = "https://servicodados.ibge.gov.br/api/v3/noticias?qtd=10"

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


document.getElementById("form-search").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const termoBusca = document.getElementById("search").value;

    try {
        const apiUrlSearch = `https://servicodados.ibge.gov.br/api/v3/noticias?q=${termoBusca}`; // URL da API com o termo de busca

        const response = await fetch(apiUrlSearch);
        const jsonDataSearch = await response.json();

        let html = ''

        for (let i = 0; i < 10; i++) {
            html += `
            <div class="div">
                <ul>
                    <li>
                        <h2>${jsonDataSearch.items[i].titulo}</h2>
                        <p>${jsonDataSearch.items[i].introducao}</p>
                        <img src="${jsonDataSearch.items[i].imagens}" alt="Imagem da Notícia"/>
                    </li>
                </ul>
            </div>
        `
        }
        main.innerHTML = html

    } catch (error) {
        console.error("Ocorreu um erro ao buscar na API:", error);
    }
});


//Main

document.addEventListener('DOMContentLoaded', () => {
    asyncFoo()
})


async function asyncFoo() {

    try {
        const fetchedData = await fetch(apiUrl);
        const jsonData = await fetchedData.json();

        let html = ''

        for (let i = 0; i < 10; i++) {
            html += `
            <div class="div">
                <ul>
                    <li>
                        <h2>${jsonData.items[i].titulo}</h2>
                        <p>${jsonData.items[i].introducao}</p>
                        <img src="${jsonData.items[i].imagens}" alt="Imagem da Notícia"/>
                    </li>
                </ul>
            </div>
        `
        }
        main.innerHTML = html
    } catch (e) {
        main.innerHTML = `
            <div class="div">
                <h2>${JSON.stringify(e)}</h2>
            </div>
        `;
        console.log(e.message);
    }
}

