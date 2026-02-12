const searchEl = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const weatherContainer = document.getElementById("weather");
const tempText = document.getElementById("temp");
const cityText = document.getElementById("city");
const humidityText = document.getElementById("humidity");
const windText = document.getElementById("wind");
const weatherIcon = document.getElementById("weather-icon");

const API_KEY = '121492b971bfd388e717e7c89f6c11db';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

searchBtn.addEventListener('click', () => {
    const city = searchEl.value.trim();
    if (city) getWeather(city);
});

searchEl.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        const city = searchEl.value.trim();
        if (city) getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City Not Found!');
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
        weatherContainer.style.display = 'none';
    }
}

function getWeatherIcon(condition) {
    condition = condition.toLowerCase();
    if (condition.includes('clear')) return 'images/clear.png';
    if (condition.includes('cloud')) return 'images/clouds.png';
    if (condition.includes('rain') || condition.includes('drizzle')) return 'images/rain.png';
    if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) return 'images/mist.png';
    if (condition.includes('snow')) return 'images/snow.png';
    if (condition.includes('wind')) return 'images/wind.png';
    return 'images/default.png';
}


