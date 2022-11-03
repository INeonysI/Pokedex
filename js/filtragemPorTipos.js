async function filtraPorTipo(tipo) {
    try {

        const requisicao = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        const requisicaoJSON = await requisicao.json()

        pokemonsFiltrados = requisicaoJSON.pokemon.map(pokemon => pokemon.pokemon)

        alteraTotal(pokemonsFiltrados.length)

        carregaNovosPokemons(totalCarregados, 9)
    } catch (erro) {
        console.log(erro)
    }
}