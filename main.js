console.log('connected')


// const userInput = document.querySelector("#user-input").value;
// fetch("https://itunes.apple.com/search?term=${userInput}")
//   .then((response) => response.json())
//   .then((quote) => console.log(quote));
// fetch(searchUrl, {
//     method: 'GET',
//     headers: {'Content-Type': 'application/json'}
// })
let container = document.querySelector('.container')
let searchBaseUrl = "https://itunes.apple.com/search?term="
let userInput = document.querySelector('#user-input')
const songPlay = document.querySelector('#audio-preview')
 

userInput.addEventListener('submit', (event) => {
    event.preventDefault()
    let searchBox = document.querySelector('#search-box')
    let searchUrl =`${searchBaseUrl}${searchBox.value}`
    // console.log("search url", searchUrl)
    getSearchResults(searchUrl) // searchUrl replaces url placeholder when calling the function
})

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
// .then performs function on previous function - here receives response -> response is whatever the fetch returns
.then(function (response) {
    return response.json()
}) 
// .then here receives parsed JSON
// data is whatever the above code returns, in this case respnse.json
.then(function (data) {
    // console.log(songs) 
    showTracks(data.results) // data.results replaces the placeholder songArray
})
}
// function for showing song results
function showTracks(songArray) {
for (let song of songArray) {
    let songResultDiv = document.createElement('div')
    songResultDiv.classList.add('song-result')
    container.appendChild(songResultDiv) // appendChild puts songResultDiv into the container
  // create event listener for songResultDiv
songResultDiv.addEventListener('click', () => {
songPlay.src = song.previewUrl
songResultDiv.play()
})


    let songTitle = document.createElement('div')
    songTitle.classList.add('song-title')
    songTitle.innerText =  `"${song.trackName}"`
    songResultDiv.appendChild(songTitle)
    
    
    let albumCover = document.createElement('img')
    albumCover.classList.add('album-cover')
    albumCover.src = song.artworkUrl100
    songResultDiv.appendChild(albumCover)
    
    let songArtist = document.createElement('div')
    songArtist.classList.add('artist-name')
    songArtist.innerText = "by " + `${song.artistName}`
    songResultDiv.appendChild(songArtist)
  

    // let albumName = document.createElement('div')
    // albumName.classList.add('album-name')
    // albumName.innerText = `${song.collectionName}`
    // songResultDiv.appendChild(albumName)
    // onclick="this.classList.toggle('active');"
}
}
