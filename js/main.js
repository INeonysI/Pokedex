var pokemons = []
var pokemonsFiltrados = []

pegaListaDePokemons()


async function pegaListaDePokemons() {
    try {
        const requisicao = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0")
        const requisicaoJSON = await requisicao.json()

        pokemons = requisicaoJSON.results
        nomes = pokemons.map(pokemon => pokemon.name)

        const totalDePokemons = document.querySelector("#totalDePokemonsTexto")
        totalDePokemons.textContent = `${pokemons.length} Pokémons`

        carregaNovosPokemons(0, 9, "All")
    } catch (erro) {
        console.log(erro)
    }
}

async function carregaNovosPokemons(inicio, quantidade, tipoDeRequisicao) {

    const novosPokemonsCarregados = await pegaDadosDosPokemons(pokemons, inicio, quantidade, tipoDeRequisicao)
    pokemonsFiltrados = pokemonsFiltrados.concat(novosPokemonsCarregados)

    geraCardsDePokemons(pokemonsFiltrados)
}

async function pegaDadosDosPokemons(pokemons, inicio, quantidade) {
    const pokemonsSubconjunto = pokemons.slice(inicio, inicio + quantidade)
    console.log(pokemonsSubconjunto)
    let requisicoes = pokemonsSubconjunto.map(pokemon => requisitaDadosDoPokemon(pokemon.name));

    return await Promise.all(requisicoes);
}


async function requisitaDadosDoPokemon(numero) {
    try {
        const requisicao = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
        const requisicaoJSON = await requisicao.json()
        return requisicaoJSON
    } catch (erro) {
        console.log(erro)
    }

}

function geraCardsDePokemons(pokemons) {
    const pokemonsList = document.querySelector(".pokemons")
    pokemonsList.innerHTML = ''

    pokemons.forEach(pokemon => {
        let imgURL = ''

        if (pokemon.sprites.other.dream_world.front_default !== null) {
            imgURL = pokemon.sprites.other.dream_world.front_default
        } else if (pokemon.sprites.front_default !== null) {
            imgURL = pokemon.sprites.front_default
        } /* else {
            imgURL = "pokemon.sprites.other.dream_world.official-artwork"
        } */

        pokemonsList.innerHTML += `
        <div class="pokemon">
            <div class="image"><img src="${imgURL}" alt="" class="pokemon--image"></div>
            <span>${zeroPad(pokemon.id, 3)}</span>
            <p>${pokemon.name}</p>
            <img src="images/types/${pokemon.types[0].type.name}.svg">
        </div>
        `
    })
}

