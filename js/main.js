var pokemons = []
var pokemonsFiltrados = []
var tipos = []

pegaListaDePokemons()
pegaListaDeTiposDePokemons()


const loadBtn = document.querySelector(".loadBtn")

loadBtn.addEventListener("click", () => {
    carregaNovosPokemons(pokemonsFiltrados.length, 9)
})

async function pegaListaDePokemons() {
    const requisicao = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    const requisicaoJSON = await requisicao.json()

    pokemons = requisicaoJSON.results
    console.log("Pokemons geração 1:")
    console.table(pokemons)

    const totalDePokemons = document.querySelector("#totalDePokemonsTexto")
    totalDePokemons.textContent = `${pokemons.length} Pokémons`

    carregaNovosPokemons(0, 9)
}

async function pegaListaDeTiposDePokemons() {
    const requisicao = await fetch("https://pokeapi.co/api/v2/type/?limit=18")
    const requisicaoJSON = await requisicao.json()

    tipos = requisicaoJSON.results

    geraTiposNoMenu(tipos)
}

async function carregaNovosPokemons(inicio, quantidade) {
    const novosPokemonsCarregados = await pegaDadosDosPokemons(pokemons, inicio, quantidade)
    pokemonsFiltrados = pokemonsFiltrados.concat(novosPokemonsCarregados)

    geraCardsDePokemons(pokemonsFiltrados)
}

async function pegaDadosDosPokemons(pokemons, inicio, quantidade) {
    const pokemonsSubconjunto = pokemons.slice(inicio, inicio + quantidade)
    let requisicoes = pokemonsSubconjunto.map(pokemon => requisitaDadosDoPokemon(pokemon.name));

    return await Promise.all(requisicoes);
}

async function requisitaDadosDoPokemon(numero) {
    const requisicao = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
    const requisicaoJSON = await requisicao.json()
    return requisicaoJSON
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
            <div class="image"><img src="${pokemon.sprites.other.dream_world.front_default}" alt="" class="pokemon--image"></div>
            <span>${zeroPad(index + 1, 3)}</span>
            <p>${pokemon.name}</p>
            <img src="images/types/${pokemon.types[0].type.name}.svg">
        </div>
        `
    })


}

function zeroPad(num, places) {
    return String(num).padStart(places, '0')
}
