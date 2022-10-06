var pokemons = []
var pokemonsFiltrados = []
var tipos = []

async function pegaListaDePokemons() {
    const requisicao = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    const requisicaoJSON = await requisicao.json()

    pokemons = requisicaoJSON.results
    console.log("Pokemons geração 1:")
    console.table(pokemons)

    pokemonsFiltrados = await pegaDadosDosPokemons(pokemons, 0, 9)
    console.log(pokemonsFiltrados)
}

async function pegaListaDeTiposDePokemons() {
    const requisicao = await fetch("https://pokeapi.co/api/v2/type/?limit=18")
    const requisicaoJSON = await requisicao.json()

    tipos = requisicaoJSON.results

    geraTiposNoMenu(tipos)
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

function geraCardsDePokemons(pokemons) {
    const pokemonsList = document.querySelector(".pokemons")
    pokemonsList.innerHTML = ''

    pokemons.forEach((pokemon, index) => {
        pokemonsList.innerHTML += `
        <div class="pokemon">
            <div class="image"><img src="images/bulba.svg" alt="" class="pokemon--image"></div>
            <span>${index}</span>
            <p>${pokemon.name}</p>
            <img src="images/types/grass.svg">
        </div>
        `
    })


}

async function pegaDadosDosPokemons(pokemons, inicio, quantidade) {
    const pokemonsSubconjunto = pokemons.slice(inicio, inicio + quantidade)
    return await pokemonsSubconjunto.map(pokemon => requisitaDadosDoPokemon(pokemon.name))
}

async function requisitaDadosDoPokemon(numero) {
    const requisicao = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
    const requisicaoJSON = await requisicao.json()

    console.log(requisicaoJSON)
}

pegaListaDePokemons()
pegaListaDeTiposDePokemons()