<template>
  <div class="home">
    <header class="container-fluid sticky-top header">
      <div class="container">
        <h1>Movies</h1>
        <div class="row navbar">
          <div class="col-sm-12 col-md-6">
            <div id="btn-container">
              <div class="dropdown">
                <button class="filter btn-secondary dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Order by: <p class="current">Last added</p></button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <router-link :to="{ name: '/', params: {} }">
                    <button class="">
                      Recently added
                    </button>
                  </router-link>
                  <router-link :to="{ name: 'rate', params: {} }">
                    <button class="">
                      Rating
                    </button>
                  </router-link>
                </div>
              </div>
              <div class="dropdown">
                <button class="filter btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Genre: <p id="current">All</p></button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <button class="btn btn-primary genre" onclick="filterSelection('all')">
                    All
                  </button>
                  <button class="genre btn" v-for="(genre, index) of genres" :key="index" :onclick="'filterSelection(\'' + genre.name + '\')'">{{ genre.name }}</button>
                </div>
              </div>
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
    <MovieList />
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
      genres: list.genres
    };
  }
};
</script>
