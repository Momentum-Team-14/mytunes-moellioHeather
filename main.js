console.log('connected')

// naming areas of html to be used in js
let resultsDiv = document.querySelector('#results')
let userInput = document.querySelector('#user-input')
let songPlay = document.querySelector('#audio-preview')
let nowPlaying = document.querySelector('.now-playing')

// naming API search parameters
let searchBaseUrl = "https://proxy-itunes-api.glitch.me//search?term="

// sets what happens when search is "submitted" -> calls getSearchResults which shows bring up the list of items from the search 
userInput.addEventListener('submit', (event) => {
    resultsDiv.innerText = '' // clear results of search when a new search is input
    event.preventDefault() // prevents search from automatically happening
    let searchBox = document.querySelector('#search-box') 
    let searchUrl =`${searchBaseUrl}${searchBox.value}`
    getSearchResults(searchUrl) // searchUrl replaces url placeholder when calling the function - getSearchResults - below
})

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
// .then performs function on previous function (here it receives response) -> response is whatever the fetch returns
.then(function (response) {
    if (!response.ok) {
        throw Error(response.status);
    } else {
        console.log(response)
    return response.json()
    }
})
// .then here receives parsed JSON
// data is whatever the above code returns, in this case respnse.json
.then(function (data) {
    // console.log(showTracks)
    // showTracks(showTracks)
    // console.log(songs) 
    showTracks(data.results) // data.results replaces the placeholder songArray
}).catch(error => {
    console.log(error)
    alert(`Your request failed: ${error}`)

})
}

// function for showing song results
function showTracks(songArray) {

    if (songArray.length > 0) {
        
    
    for (let song of songArray) {
        let songResultDiv = document.createElement('div');
        songResultDiv.classList.add('song-result')
        resultsDiv.appendChild(songResultDiv) // appendChild puts songResultDiv into the resultsDiv
        
        // create event listener for songResultDiv
        songResultDiv.addEventListener('click', () => {
        songPlay.src = song.previewUrl
        nowPlaying.innerText = `Now playing: "${song.trackName}" by ${song.artistName} (from the album ${song.collectionName})`
        songPlay.volume=0.25
        songPlay.play()
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
        
    } 
} else {
        let noResults = document.createElement('div')
        noResults.classList.add('no-results')
        noResults.innerText = "Nothing Found - please try again!"
        resultsDiv.appendChild(noResults)
        console.log(noResults)
    }
}

