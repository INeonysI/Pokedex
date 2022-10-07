async function filtraPorTipo(tipo) {
    try {

        const requisicao = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`)
        const requisicaoJSON = await requisicao.json()

        pokemons = requisicaoJSON.pokemon.map(pokemon => pokemon.pokemon)

        const totalDePokemons = document.querySelector("#totalDePokemonsTexto")
        totalDePokemons.textContent = `${pokemons.length} Pokémons`

        console.log(pokemons)

        carregaNovosPokemons(0, 9, tipo)
    } catch (erro) {
        console.log(erro)
    }
}