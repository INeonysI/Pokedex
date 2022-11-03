const barraDeBusca = document.querySelector(".search--input")

barraDeBusca.addEventListener("input", function () {
    valor = this.value
    if (valor.length > 0) {
        resetaDisplayDePokemons()
        isNaN(valor) ? buscaPorNome(valor) : buscaPorCodigo(valor)
    } else {
        resetaDisplayDePokemons()
        totalCarregados = 0
        const tipo = document.querySelector(".type-selected").querySelector("span").textContent
        tipo === "All" ? pegaListaDePokemons() : filtraPorTipo(tipo)
    }

})

async function buscaPorNome(valor) {
    var valoresCorrespondentes = []
    pokemons.map(pokemon => {
        if (pokemon.name.startsWith(valor)) {
            valoresCorrespondentes.push(pokemon.name)
        }
    })
    console.log(valor)
    console.log(valoresCorrespondentes)

    var pokemonsBuscados = await requisitaDadosDaBusca(valoresCorrespondentes)
    geraCardsDePokemons(pokemonsBuscados)
}

async function buscaPorCodigo(valor) {
    var arrayAux = [valor]
    var pokemonsBuscados = await requisitaDadosDaBusca(arrayAux)
    geraCardsDePokemons(pokemonsBuscados)
}

async function requisitaDadosDaBusca(valores) {
    let requisicoes = valores.map(valor => requisitaDadosDeUmPokemon(valor));

    return await Promise.all(requisicoes);
}

