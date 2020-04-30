<template>
  <body
    :onload="
      `var client = new WebTorrent();
      let torrentId = '` +
        movie.torrent +
        `tracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'


     // HTML elements
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')

      var player = videojs('video-player');
  client.add(torrentId, function(torrent) {
  var file = torrent.files.find(function(file) {
       return file.name.endsWith('.mp4')
     });
  file.renderTo('video#video-player_html5_api', {}, function callback() {
    console.log('ready to play!');
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
}
  });`
    "
  >
    <GoBack />
    <h1>Streaming: {{ movie.title }}</h1>
    <div id="video-container">
      <video class="video-js" id="video-player" controls preload="auto" autoplay data-setup='{"playbackRates": [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] }'>
      </video>
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
    //VideoJS CSS
    let videocss = document.createElement("link");
    videocss.setAttribute("href", "https://vjs.zencdn.net/7.7.5/video-js.css");
    videocss.setAttribute("rel", "stylesheet");
    document.head.appendChild(videocss);
    //VideoJS Support for IE8
    let videold = document.createElement("script");
    videold.setAttribute("src", "https://vjs.zencdn.net/ie8/1.1.2/videojs-ie8.min.js");
    document.head.appendChild(videold);
    //VideoJS
    let videojs = document.createElement("script");
    videojs.setAttribute("src", "https://vjs.zencdn.net/7.7.5/video.js");
    document.body.appendChild(videojs);
    //Moment.js
    let moment = document.createElement("script");
    moment.setAttribute("src", "http://momentjs.com/downloads/moment.min.js");
    document.body.appendChild(moment);
    //WebTorrent
    let wt = document.createElement("script");
    wt.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js"
    );
    document.body.appendChild(wt);
  }
};
</script>
