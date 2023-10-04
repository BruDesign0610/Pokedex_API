const container = document.getElementById('card-container')
console.log(container)

async function requisicaoApiPokemon (){
    const retornoPromessas = []
    for(let index = 1; index <=150; index ++){
        const fetchApiPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)

        const retornoApiPokemon = await fetchApiPokemon.json()
        retornoPromessas.push(retornoApiPokemon)
    }

    const arrayPokemons = retornoPromessas
    console.log(arrayPokemons)
    return arrayPokemons
}





function filtrarPorNome() {
    const inputNome = document.getElementById('nomePokemon').value.toLowerCase();
    const cards = document.querySelectorAll('.card_img');

    cards.forEach(card => {
        const nomePokemon = card.querySelector('.card_texto h2').textContent.toLowerCase();

        if (nomePokemon.includes(inputNome)) {
            card.style.display = 'block'; // Mostra o card se o nome corresponder
        } else {
            card.style.display = 'none'; // Esconde o card se o nome não corresponder
        }
    });
}

async function renderizaPokemons (){
    const arrayPokemons = await requisicaoApiPokemon()
    const cardPokemon = arrayPokemons.map((pokemon) => {
        return `
        <div class="card_img ${pokemon.types[0].type.name}">
          <img src="${pokemon.sprites.front_default}" alt="pokemon img">
          <img src="${pokemon.sprites.front_shiny}" alt="pokemons shiny">
          <div class="card_texto">
              <h2>${pokemon.name}</h2>
              <div>
                  <h3>Tipo:</h3>
                  <p>${pokemon.types[0].type.name}</p>
              </div>
              <div>
                  <h3>Habilidade:</h3>
                  <p>${pokemon.abilities[0].ability.name}</p>
              </div>
          </div>
      </div>`
    })
    container.innerHTML = cardPokemon.join('')
}

renderizaPokemons()