console.log('connected')

let container = document.querySelector('.container')

let searchUrl = "https://itunes.apple.com/search?term=fever"

const userInput = document.querySelector("#user-input").value;

fetch("https://itunes.apple.com/search?term=${userInput}")
  .then((response) => response.json())
  .then((quote) => console.log(quote));


fetch(searchUrl, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})

// .then performs function on previous function
// .then here receives response
// response is whatever the fetch returns
.then(function (response) {
    return response.json()

}) 
// .then here receives parsed JSON
// data is whatever the above code returns, in this case respnse.json
.then(function (data) {
    let searchResults = data.results
    // console.log(songs)   
    showTracks(searchResults)
})

// function for showing song results
function showTracks(songArray) {
for (let song of songArray) {
  let songResultDiv = document.createElement('div')
  songResultDiv.classList.add('song-result')
  container.appendChild(songResultDiv)
    
    let songArtist = document.createElement('div')
    songArtist.classList.add('artist-name')
    songArtist.innerText = `${song.artistName}`
    songResultDiv.appendChild(songArtist)

    let albumCover = document.createElement('img')
    albumCover.classList.add('album-cover')
    albumCover.src = `${song.artworkUrl100}`
    songResultDiv.appendChild(albumCover)

    let songTitle = document.createElement('div')
    songTitle.classList.add('song-title')
    songTitle.innerText = `${song.trackName}`
    songResultDiv.appendChild(songTitle)

    let albumName = document.createElement('div')
    albumName.classList.add('album-name')
    albumName.innerText = `${song.collectionName}`
    songResultDiv.appendChild(albumName)
}
}
