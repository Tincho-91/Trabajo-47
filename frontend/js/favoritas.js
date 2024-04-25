window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);
  

  // Aqui debemos agregar nuestro fetch
  const peliculas = await fetch(`http://localhost:3031/api/movies/`)
    .then(resp => resp.json())
    .then(info => info);


  /** Codigo que debemos usar para mostrar los datos en el frontend */
  let data = peliculas.data;
  let favorites = JSON.parse(localStorage.getItem("favoritesMovies"));

  if (favorites.length >= 1) {
    favorites.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");

      
      const fav = document.createElement("i");
      fav.classList.add("fa-regular", "fa-star");
      fav.id = movie.id;
      fav.style.backgroundColor = "red";
      fav.addEventListener("click", function(e) {
        fav.style.backgroundColor = null;
        favorites = favorites.filter(element => element.id != movie.id);
        const moviesJson = JSON.stringify(favorites);
        localStorage.setItem("favoritesMovies", moviesJson);
        location.reload();
      });

      
      h1.appendChild(fav);

      
      h1.appendChild(document.createTextNode(movie.title));

      
      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      card.appendChild(h1);
      card.appendChild(p);

      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      container.appendChild(card);
    });
  } else {
    const emptyStorage = document.createElement("h1");
    emptyStorage.innerText = "Aún no seleccionaste tus películas favoritas";
    container.appendChild(emptyStorage);
  }
};