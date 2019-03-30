
document.addEventListener('DOMContentLoaded', function () {
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', event => {
        console.log("button clicked!");
        searchTrack()
    });    
});

function searchTrack() {
    //get user input
    const userInput =  document.getElementById('searchtext')
    const searchError = document.getElementById('searcherror')
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
    getTracks(userInput)
        .then(function (trackData) {
            console.log(trackData)
        })
}
