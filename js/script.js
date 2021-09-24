const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    toggleSpinner();
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError(error));
}

const errorTag = document.getElementById('error-message');
const lyricsDiv = document.getElementById('song-lyrics');

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    errorTag.innerText = " "
    lyricsDiv.innerText = " "
    document.getElementById("search-field").value = " "
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
            <img src="${song.artist.picture_medium}">
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    })
}