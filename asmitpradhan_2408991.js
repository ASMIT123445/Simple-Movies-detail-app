document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("searchForm");
  const movieInput = document.getElementById("movie");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const movie = movieInput.value;

    if (movie.trim() === "") {
      alert("Please enter a movie title.");
    } else {
      getMovies(movie);
    }
  });

  async function getMovies(movieTitle) {
    const APIkey = "bbb8ec0b";
    const searchedMoviesURL = `http://www.omdbapi.com/?apikey=${APIkey}&t=${movieTitle.toLowerCase()}`;

    try {
      const res = await fetchUrl(searchedMoviesURL);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      const poster = data.Poster;
      const year = data.Year;
      const title = data.Title;
      const plot = data.Plot;

      const movieHTML = `<h1>${title}</h1>
      <img src=${poster}>
      <p class="date">Published date: ${year}</p>
      <p class="date">Plot: ${plot}</p>`;

      document.getElementById("movielist").innerHTML = movieHTML;
    } catch (err) {
      console.error(err);
      document.getElementById(
        "movielist"
      ).innerHTML = `<strong style="color: red;">Please check your spelling and try again</strong>`;
    }
  }

  async function fetchUrl(url) {
    const res = await fetch(url);

    return res;
  }

  window.onload = getMovies("Breaking Bad");
});
