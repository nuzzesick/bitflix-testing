var torrentId = document.getElementById("torrent").innerText;
var client = new WebTorrent()

var $body = document.body
var $player = document.querySelector('#video')
var $progressBar = document.querySelector('#progressBar')
var $numPeers = document.querySelector('#numPeers')
var $downloaded = document.querySelector('#downloaded')
var $total = document.querySelector('#total')
var $remaining = document.querySelector('#remaining')
var $uploadSpeed = document.querySelector('#uploadSpeed')
var $downloadSpeed = document.querySelector('#downloadSpeed')

  client.add(torrentId, function(torrent) {
  var file = torrent.files.find(function(file) {
       return file.name.endsWith('.mp4')
     });
  file.renderTo($player, {}, function callback() {
    $player.play();
    console.log("ready to play!");
    // Trigger statistics refresh
torrent.on('done', onDone)
setInterval(onProgress, 500)
onProgress()
file.getBlobURL(function (err, url) {
  if (err) throw err
  var a = document.getElementById('downloadButton')
  a.classList.remove("download-disabled")
  a.classList.add("btn-primary")
  a.removeAttribute("data-original-title")
  a.download = file.name
  a.href = url
  var b = document.getElementById('downloadButtonMobile')
  b.classList.remove("download-disabled")
  b.classList.add("btn-primary")
  b.removeAttribute("data-original-title")
  b.download = file.name
  b.href = url
})

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
  $player.className += ' is-seed'
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
  });
