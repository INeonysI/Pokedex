let nomes = []
const barraDeBusca = document.querySelector(".search--input")

barraDeBusca.addEventListener("input", function () {
    valor = this.value
    if (valor.length > 0) {
        isNaN(valor) ? buscaPorNome(valor) : buscaPorCodigo(valor)
    } else {
        const tipo = document.querySelector(".type-selected").querySelector("span").textContent
        tipo === "All" ? pegaListaDePokemons() : filtraPorTipo(tipo)
    }

})

async function buscaPorNome(valor) {
    var valoresCorrespondentes = []
    nomes.forEach(nome => {
        if (nome.startsWith(valor)) {
            valoresCorrespondentes.push({ "name": nome })
        }
    })
    console.log(valor)
    console.log(valoresCorrespondentes)

    let pokemonsBuscados = await requisitaDadosDaBusca(valoresCorrespondentes)
    geraCardsDePokemons(pokemonsBuscados)
}

function buscaPorCodigo(valor) {

}

async function requisitaDadosDaBusca(valores) {
    let requisicoes = valores.map(valor => requisitaDadosDoPokemon(valor.name));

    return await Promise.all(requisicoes);
}

