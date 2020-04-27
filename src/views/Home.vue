<template>
  <div class="home">
    <h1>
      All movies
    </h1>
    <div class="movies">
      <div v-for="movie in movies" :key="movie.title">
        <router-link
          :to="{
            name: 'movieDetails',
            params: { id: movie.id }
          }"
        >
          <h2>{{ movie.title }}</h2>
        </router-link>
        <figure>
          <router-link
            :to="{
              name: 'movieDetails',
              params: { id: movie.id }
            }"
          >
            <img
              :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster"
              :alt="movie.title"
            />
          </router-link>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import list from "@/list.js";
export default {
  name: "home",
  components: {},
  data() {
    return {
      movies: list.movies
    };
  }
};
</script>
<style scoped>
.home {
  max-width: 1400px;
  margin: 0 auto;
}
img {
  max-width: 200px;
}
.movies {
  display: flex;
  justify-content: space-between;
}
a {
  color: lightseagreen;
  text-decoration: none;
}
a:hover,
a:visited {
  text-decoration: underline;
}
</style>
