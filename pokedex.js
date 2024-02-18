const pokemonCharacters = async () => {
  // función para sacar la lista de los personajes (hasta 150)
  const listApi = "https://pokeapi.co/api/v2/pokemon/";
  const pokemonList = 150;

  for (let i = 1; i <= pokemonList; i++) {
    // se iterea sobre la lista de la api.
    const url = `${listApi}${i}`;

    try {
      const link = await fetch(url);
      const pokemonValue = await link.json();

      const pokemon = {
        // sacamos los datos que queremos mostrar más tarde
        name: pokemonValue.name,
        image: pokemonValue.sprites["front_default"],
        type: pokemonValue.types.map((type) => type.type.name).join(", "),
        id: pokemonValue.id,
      };

      drawPokemon(pokemon); // Llamamos a la función para pintar el Pokémon en la Pokédex
    } catch (error) {
      console.error(`Error al obtener Pokemon ${i}: ${error.message}`);
    }
  }
};

function drawPokemon(pokemon) {
  // funcion para pintar los personajes de pokemon en Pokedex
  const pokedex$$ = document.querySelector("#pokedex");
  const card = document.createElement("li"); // creamos las cartas en una lista 'li'
  card.classList.add("card"); // se añade la clase 'card' a la lista 'li'
  card.innerHTML =
    // agregamos al html los datos de los personajes
    `
      <p class="card-subtitle">${pokemon.id}</p>
      <img src="${pokemon.image}" alt="${pokemon.name}" class="card-image">
      <h2 class="card-title">${pokemon.name}</h2>
      <p class="card-subtitle">Tipo: ${pokemon.type}</p>
    `;

  pokedex$$.appendChild(card); // agregamos la tarjeta a pokedex
};

pokemonCharacters(); // llamamos a la funcion para mostrarlos
