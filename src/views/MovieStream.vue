<template>
  <div>
    <GoBack />
    <section class="movies">
      <h1>Streaming: {{movie.torrentId}}</h1>
    </section>
  </div>
</template>
<script>
import list from "@/list";
import GoBack from "@/components/GoBack";
export default {
  components: {
    GoBack
  },
  data() {
    return {
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  created() {
    console.log(this.$router.params)
  },
  computed: {
    movie() {
      return list.movies.find(
        movie => movie.id === this.id
      );
    }
  }
};
</script>

<style scoped>
img {
  max-width: 600px;
  height: auto;
  width: 100%;
  max-height: 400px;
}
.movie-details {
  display: flex;
  justify-content: space-between;
}
p {
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}
.cards {
  display: flex;
  justify-content: space-between;
}
.cards img {
  max-height: 200px;
}
.card {
  padding: 0 20px;
  position: relative;
}
.card__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-decoration: none;
}
</style>
