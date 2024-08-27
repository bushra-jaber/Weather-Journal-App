const apiKey = '79806ada2d55135db129c4d9817acf4e';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

async function getWeatherData(zipCode) {
    const url = `${baseURL}${zipCode},us&appid=${apiKey}&units=imperial`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Failed to fetch weather data: ", e);
    }
}

async function postData(url = '', data = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Failed to post data: ", e);
    }
}

async function updateUI() {
    try {
        const request = await fetch('/all');
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)} degrees`;
        document.getElementById('content').innerHTML = `User response: ${allData.userResponse}`;
    } catch (error) {
        console.error("Failed to update UI: ", error);
    }
}

document.getElementById('generate').addEventListener('click', async () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const weatherData = await getWeatherData(zipCode);
    if (weatherData) {
        const newEntry = {
            temperature: weatherData.main.temp,
            date: new Date().toLocaleDateString(),
            userResponse: feelings
        };
        await postData('/add', newEntry);

        updateUI();
    } else {
        console.error("No weather data to post.");
    }
});