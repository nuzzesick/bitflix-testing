<template>
  <body
    :onload="
      `let torrentId = '` +
        movie.torrent +
        `tracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'

     var client = new WebTorrent()

     // HTML elements
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')

      // Download the torrent
      client.add(torrentId, function (torrent) {

        // Torrents can contain many files. Let's use the .mp4 file
        var file = torrent.files.find(function (file) {
          return file.name.endsWith('.mp4')
        })

        // Stream the file in the browser
        file.appendTo('#output')

        // Trigger statistics refresh
        torrent.on('done', onDone)
        setInterval(onProgress, 500)
        onProgress()

        // Statistics
        function onProgress () {
          // Peers
          $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

          // Progress
          var percent = Math.round(torrent.progress * 100 * 100) / 100
          $progressBar.style.width = percent + '%'
          $downloaded.innerHTML = prettyBytes(torrent.downloaded)
          $total.innerHTML = prettyBytes(torrent.length)

          // Remaining time
          var remaining
          if (torrent.done) {
            remaining = 'Done.'
          } else {
            remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
            remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
          }
          $remaining.innerHTML = remaining

          // Speed rates
          $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
          $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
        }
        function onDone () {
          $body.className += ' is-seed'
          onProgress()
        }
      })

      // Human readable bytes util
      function prettyBytes(num) {
        var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        if (neg) num = -num
        if (num < 1) return (neg ? '-' : '') + num + ' B'
        exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number((num / Math.pow(1000, exponent)).toFixed(2))
        unit = units[exponent]
        return (neg ? '-' : '') + num + ' ' + unit
      }`
    "
  >
    <GoBack />
    <h1>Streaming: {{ movie.title }}</h1>
    <div id="hero">
      <div id="output">
        <div id="progressBar"></div>
        <!-- The video player will be added here -->
      </div>
      <!-- Statistics -->
      <div id="status">
        <div>
          <span class="show-leech">Downloading </span>
          <span class="show-seed">Seeding </span>
          <code>
            <!-- Informative link to the torrent file -->
            <a id="torrentLink" :href="movie.torrent">{{ movie.title }}</a>
          </code>
          <span class="show-leech"> from </span>
          <span class="show-seed"> to </span>
          <code id="numPeers">0 peers</code>.
        </div>
        <div>
          <code id="downloaded"></code>
          of <code id="total"></code> — <span id="remaining"></span><br />
          &#x2198;<code id="downloadSpeed">0 b/s</code> / &#x2197;<code
            id="uploadSpeed"
            >0 b/s</code
          >
        </div>
      </div>
    </div>
  </body>
</template>
<script>
import list from "@/list";
import GoBack from "@/components/GoBack";
export default {
  components: {
    GoBack
  },
  data() {
    return {};
  },
  props: {
    imdb_id: {
      type: String,
      required: true
    }
  },
  computed: {
    movie() {
      return list.movies.find(movie => movie.imdb_id === this.imdb_id);
    }
  },
  mounted() {
    let moment = document.createElement("script");
    moment.setAttribute("src", "http://momentjs.com/downloads/moment.min.js");
    document.body.appendChild(moment);
    let wt = document.createElement("script");
    wt.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js"
    );
    document.body.appendChild(wt);
  }
};
</script>
