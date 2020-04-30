<template>
  <div class="home">
    <header class="container-fluid sticky-top header">
      <div class="container">
        <h1>Movies</h1>
        <div class="row navbar">
          <div class="col-sm-12 col-md-6">
            <div id="btn-container">
              <button class="btn btn-primary" onclick="filterSelection('all')">
                All
              </button>
              <div class="dropdown">
                <button class="genre btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Genre</button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="btn" style="font-size: 13px" v-for="(genre, index) of genres" :key="index" :onclick="'filterSelection(\'' + genre.name + '\')'">{{ genre.name }}</button>
                </div>
              </div>
              <button class="btn" onclick="filterSelection('favorites')">
                Favorites
              </button>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="searchContainer">
              <input
                id="search"
                type="text"
                placeholder="Search movies.."
                autocomplete="off"
              /><i class="fas fa-search"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="container movies">
      <ul id="search-ul">
        <div class="row">
          <li :id="movie.imdb_id" v-for="movie in movies" :class="['filterDiv' + ' ' + 'col-sm-6' + ' ' + 'col-md-4' + ' ' + 'col-lg-3', {'favorites show': moviesVotes[movie.id]}, movie.genres]" :key="movie.id">
            <router-link :to="{ name: 'movieDetails', params: { imdb_id: movie.imdb_id } }">
              <img class="poster" :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + movie.poster_path" :alt="movie.title" />
            </router-link>
            <h2 class="movie-title" data-toggle="tooltip" data-placement="bottom" :title="movie.title" >{{ movie.title }}</h2>
            <p class="year">{{ movie.release_date }}</p>
          </li>
        </div>
      </ul>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/list.js";
import Footer from "@/components/Footer";
export default {
  name: "home",
  components: {
    Footer
  },
  data() {
    return {
      genres: list.genres,
      movies: list.movies,
      moviesVotes: {}
    };
  },
  mounted() {
    let appScript = document.createElement("script");
    appScript.setAttribute("src", "/js/script.js");
    document.head.appendChild(appScript);
    this.setVotesFromPersistence();
  },
  methods: {
    setVote(movieId) {
      if (localStorage.getItem(movieId)) {
        localStorage.removeItem(movieId);
        this.moviesVotes[movieId] = null;
      } else {
        localStorage.setItem(movieId, true);
        this.moviesVotes[movieId] = true;
      }
    },
    setVotesFromPersistence() {
      this.moviesVotes = this.movies.reduce((acc, item) => {
        acc[item.id] = localStorage.getItem(item.id);
        return acc;
      }, {});
    }
  }
};
</script>
