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
              <button @click="sortByRate">Sort by Rate</button>
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
    <MovieList/>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/list.js";
import MovieList from "@/components/MovieList";
import Footer from "@/components/Footer";
export default {
  name: "home",
  components: {
    MovieList,
    Footer
  },
  data() {
    return {
      genres: list.genres,
      movies: list.movies,
    };
  },
  mounted() {
    this.sortByRate();
  },
  methods: {
    sortByRate() {
    console.log('hello');
      this.movies = this.movies.sort(function(a, b) { return a.vote_average - b.vote_average });
    }
  }
};
</script>
