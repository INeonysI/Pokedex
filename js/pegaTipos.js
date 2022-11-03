var tipos = []

pegaListaDeTiposDePokemons()

async function pegaListaDeTiposDePokemons() {
    try {
        const requisicao = await fetch("https://pokeapi.co/api/v2/type/?limit=18")
        const requisicaoJSON = await requisicao.json()

        tipos = requisicaoJSON.results

        geraTiposNoMenu(tipos)

        adicionaFuncaoDeFiltrarPorTipo()
    } catch (erro) {
        console.log(erro)
    }

}

function geraTiposNoMenu(tipos) {
    const menu = document.querySelector(".menu")
    tipos.forEach(tipo => {
        menu.innerHTML += `
        <button class="type">
            <img src="./images/types/${tipo.name}.svg" alt="" class="type__icon">
            <span>${tipo.name}</span>
        </button>
        `
    });
}
