
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit')
    const trackList = document.getElementById('track-list')

    submitButton.addEventListener('click', event => {
        // console.log("button clicked!")
        searchTrack()
    })
    trackList.addEventListener('click', event => {
        // console.log("track clicked!")
        if(event.target && event.target.nodeName == "IMG") {
            // console.log("List item ", event.target.id, " was clicked!")
            const audioBar = document.getElementById('audio')
            audioBar.src = event.target.id
            audioBar.play()
        }
    })

})

function searchTrack() {
    //get user input
    const userInput =  document.getElementById('searchtext')
    const searchError = document.getElementById('searcherror')
    // reset audio bar
    const audioBar = document.getElementById('audio')
    audioBar.src = ""
    //get value of the user input and validate it
    const userInputValue = userInput.value
    if(userInputValue != null && userInputValue != '') {
        searchError.innerText = ''
        updateTracks(userInputValue)

    }
    else {
        searchError.innerText = "type name of artist or song" 
    }
}

function getTracks(userInput) {
    const promise = fetch(
      `https://itunes-api-proxy.glitch.me/search?media=music&entity=musicArtist&entity=musicTrack&term=${userInput}&country=US`
    ).then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    return promise
  }

//updating tracks in html
function updateTracks(userInput) {
    //get tracks from iTunes API
    getTracks(encodeURIComponent(userInput))
    .then(function (trackData) {
        console.log(trackData)
        const trackListDiv = document.getElementById('track-list')
        trackListDiv.innerHTML = ""
        for(let i=0; i<trackData.resultCount; i++){
            const result = trackData.results[i]
            // create track element and add class
            const imageHtml = `<img id="${result.previewUrl}" src="${result.artworkUrl100}" />`
            const trackNameDiv = `<div class="track-name">${result.trackCensoredName}</div>`
            const trackArtistDiv = `<div class="track-artist">${result.artistName}</div>`
            let track = document.createElement('div')
            track.classList.add('track')
            track.innerHTML = `${imageHtml} ${trackNameDiv} ${trackArtistDiv}`
            trackListDiv.append(track)
        }
        
        
        // const imageHtml = `<img id="${result.previewUrl}" src="${result.artworkUrl100}" />`
        // const trackNameDiv = `<div class="track-name">${result.trackCensoredName}</div>`
        // const trackArtistDiv = `<div class="track-artist">${result.artistName}</div>`
        // console.log(imageHtml)
        // console.log(trackNameDiv)
        // console.log(trackArtistDiv)
        // trackListDiv.innerHTML = `<div class="track">${imageHtml} ${trackNameDiv} ${trackArtistDiv}</div>`

    })
}

