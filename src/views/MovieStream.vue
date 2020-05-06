<template>
  <div>
    <div class="background-movie" :style="'background-image: url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path + ')'"></div>
    <div class="movie-streaming-container">
      <div class="top">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <GoBack />
            </div>
            <div class="col-6">
              <div class="favorites-container">
                <a id="downloadButton" class="btn download-disabled" data-toggle="tooltip" data-placement="bottom" title="Movie must first be downloaded"><i class="fas fa-cloud-download-alt"></i> Download movie</a>
                <a @click="setVote(movie.id)" class="btn" :class="moviesVotes[movie.id] ? 'unfavorite' : 'favorite'" data-toggle="tooltip" data-placement="bottom" title="Favorites"><i class="fa fa-heart"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div id="torrent">magnet:?xt=urn:btih:{{movie.torrent}}&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com</div>
        <div class="container h-100">
          <div class="playerContainer h-100">
            <vue-plyr>
              <video :src="'https://live-torrent-testing.herokuapp.com/api/torrent/serve/' + movie.torrent + '/:video'" id="player" playsinline preload="auto" controls crossorigin="anonymous" :data-poster="'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/' + movie.backdrop_path" autoplay>
                <track kind="subtitles" :src="movie.es" srclang="es" label="Español" default>
                <track kind="subtitles" :src="movie.en" srclang="en" label="English">
                <track kind="subtitles" :src="movie.fr" srclang="fr" label="Français">
                <track kind="subtitles" :src="movie.br" srclang="br" label="Brazilian Portuguese">
                <track kind="subtitles" :src="movie.ita" srclang="ita" label="Italiano">
              </video>
            </vue-plyr>
            <div class="progressbar" data-toggle="tooltip" data-placement="bottom" title="Torrent progress">
              <div id="progressBar"></div>
            </div>
          </div>
          <!-- Statistics -->
          <div id="status">
            <div>
              <code>
                <!-- Informative link to the torrent file -->
                <h6 class="movie-info-title">Playing: {{movie.title}}</h6>
              </code>
              <span class="show-leech">from </span>
              <span class="show-seed"> to </span>
              <code id="numPeers"> 0 peers</code>.
            </div>
            <div class="health">
              <code id="downloaded"></code>
              of <code id="total"></code>
              — <span id="remaining"></span><br/>
              <i class="fas fa-arrow-down"></i><code id="downloadSpeed">0 b/s</code>
              / <i class="fas fa-arrow-up"></i><code id="uploadSpeed">0 b/s</code>
            </div>
          </div>
          <div class="mobile-download text-center">
            <a id="downloadButtonMobile" class="btn download-disabled" data-toggle="tooltip" data-placement="bottom" title="Movie must first be downloaded"><i class="fas fa-cloud-download-alt"></i> Download movie</a>
          </div>
        </div>
      </div>
    <Footer />
  </div>
</template>
<script>
import list from "@/list";
import GoBack from "@/components/GoBack";
import Footer from "@/components/Footer";
export default {
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
    let appScript = document.createElement("script");
    appScript.setAttribute("src", "/js/script.js");
    document.head.appendChild(appScript);
    //Player
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
