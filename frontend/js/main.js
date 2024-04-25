window.onload = async () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  const peliculas = await fetch(`http://localhost:3031/api/movies/`)
    .then(resp => resp.json())
    .then(info => info);

  const data = peliculas.data;
  const movieArray = JSON.parse(localStorage.getItem("favoritesMovies")) || [];

  data.forEach((movie) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const h1 = document.createElement("h1");
    h1.appendChild(document.createTextNode(movie.title));

    const fav = document.createElement("i");
    fav.classList.add("fa-regular", "fa-star");
    fav.id = movie.id;
    fav.addEventListener("click", function(e) {
      fav.id = movie.id;
      fav.classList.toggle("liked");

      if (fav.classList.contains("liked")) {
        fav.style.backgroundColor = "red";
        movieArray.push(movie);
      } else {
        fav.style.backgroundColor = null;
        movieArray = movieArray.filter(element => element.id != movie.id);
      }
      const moviesJson = JSON.stringify(movieArray);
      localStorage.setItem("favoritesMovies", moviesJson);
    });

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
    
    
    h1.appendChild(fav);

    container.appendChild(card);

    if (movieArray.some(element => element.id === movie.id)) {
      fav.classList.add("liked");
      fav.style.backgroundColor = "red";
    }
  });
};