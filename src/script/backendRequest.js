function backendRequest(handle, requestBody) {
    fetch(`https://skypro-rock-scissors-paper.herokuapp.com/${handle}?` + new URLSearchParams(requestBody))
        .then(response => response.json())
        .then(data => { return data })
}
