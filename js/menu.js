function adicionaFuncaoDeFiltrarPorTipo() {
    const tiposBtn = document.querySelectorAll(".type")

    tiposBtn.forEach(tipoBtn => {
        tipoBtn.addEventListener("click", () => {
            pokemonsFiltrados = []
            desselecionarOutrosTipos(tiposBtn)
            tipoBtn.classList.add("type-selected")

            const tipo = tipoBtn.querySelector("span").textContent

            tipo === "All" ? pegaListaDePokemons() : filtraPorTipo(tipo)
        })
    })
}

function desselecionarOutrosTipos(botoes) {
    botoes.forEach(botao => botao.classList.remove("type-selected"))
}