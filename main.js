
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit')
    const trackList = document.getElementById('track-list')
    
    //attach click event listener to submit button
    submitButton.addEventListener('click', event => {
        //when button gets clicked, call searchTrack function
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

//gets called when submit button gets clicked
function searchTrack() {
    //get user input
    const userInput =  document.getElementById('searchtext')
    //if invalid input, search error msg in else stmt
    const searchError = document.getElementById('searcherror')
    // reset audio bar for new search
    const audioBar = document.getElementById('audio')
    audioBar.src = ""
    //get value of the user input and validate it
    const userInputValue = userInput.value
    if(userInputValue != null && userInputValue != '') {
        //reset error msg
        searchError.innerText = ''
        
        updateTracks(userInputValue)

    }
    else {
        searchError.innerText = "type name of artist or song" 
    }
}
//call to iTunes API to get tracks based on user input
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
        //console.log(trackData)
        const trackListDiv = document.getElementById('track-list')
        // clear track list for new search
        trackListDiv.innerHTML = ""
        // iterate through result array and build list
        for(let i=0; i<trackData.resultCount; i++){
            const result = trackData.results[i]
            // create track element and add class
            const imageHtml = `<img class="artwork" id="${result.previewUrl}" src="${result.artworkUrl100}" />`
            const trackNameDiv = `<div class="track-name">${result.trackCensoredName}</div>`
            const trackArtistDiv = `<div class="track-artist">${result.artistName}</div>`
            let track = document.createElement('div')
            track.classList.add('track')
            track.innerHTML = `${imageHtml} ${trackNameDiv} ${trackArtistDiv}`
            //append track into trackListDiv
            trackListDiv.append(track)
        }

    })
}

