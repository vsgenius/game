async function backendRequest(pathName, requestBody) {
    try {
        const response = await fetch(`https://skypro-rock-scissors-paper.herokuapp.com/${pathName}?` + new URLSearchParams(requestBody))

        if (response.status >= 400) throw new Error('Network Error');

        return await response.json();
    }

    catch (error) {
        application.renderScreen('errorNetwork');
        application.clearTimers();
    }
}
