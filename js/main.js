var pokemons = []

async function pegaListaDePokemons() {
    const requisicao = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    const requisicaoJSON = await requisicao.json()

    console.log(requisicaoJSON)
    pokemons = requisicaoJSON.results
    console.table(pokemons)
}

pegaListaDePokemons()