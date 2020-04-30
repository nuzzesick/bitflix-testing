<template>
  <div>
    <div class="top">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <GoBack />
          </div>
          <div class="col-6">
            <div class="favorites-container">
              <a
              @click="setVote(movie.id)"
              :class="moviesVotes[movie.id] ? 'unfavorite' : 'favorite'"
              ><i class="fa fa-heart"></i>
              </a>
            </div>
          </div>
        </div>
        <router-link
          :to="{
            name: 'movieStream',
            params: { imdb_id: movie.imdb_id }
          }"
        >
          <h2>Play</h2>
          <br />
          <br />
        </router-link>
        <a :href="'../stream/' + movie.imdb_id">Ver jaja</a>
      </div>
    </div>
    <Footer />
    <!-- <router-link
      :to="{
        name: 'movieStream',
        params: { id: movie.id }
      }"
    >
      <h2>Play</h2>
    </router-link> -->
    <!-- <img :src="'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.poster"> -->
  </div>
</template>
<script>
import list from "@/list";
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
  name: "movieDetails",
  components: {
    GoBack,
    Footer
  },
  data() {
    return {
      movies: list.movies,
      moviesVotes: {}
    };
  },
  props: {
    imdb_id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.setVotesFromPersistence();
  },
  methods: {
  /**
   * set vote on persistence(localStorage) if not exists and
   * update the object moviesClass with the current vote
   *
   * @param {string} movieId
   */
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
  },
  computed: {
    movie() {
      return list.movies.find(movie => movie.imdb_id === this.imdb_id);
    }
  }
};
</script>
