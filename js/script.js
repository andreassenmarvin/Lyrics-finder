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
