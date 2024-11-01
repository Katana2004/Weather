async function fetchWeather() {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    // Save City and Country
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);

    console.log("Fetching weather for:", city, country);  // Добавим вывод для отладки

    try {
        const weather = await eel.get_weather(city, country)();
        console.log("Weather data received:", weather);  // Выводим данные в консоль

        if (weather.error) {
            document.getElementById('weather').innerHTML = '<p>Error: ' + weather.error + '</p>';
            document.getElementById('weather').style.display = 'block';
            return;
        }

        document.getElementById('weather').innerHTML = `
            <p>In ${city}, it is currently ${weather.status}.</p>
            <p>Temperature: ${Math.round(weather.temp)}°C (Min: ${Math.round(weather.temp_min)}°C, Max: ${Math.round(weather.temp_max)}°C).</p>
            <p>Humidity: ${weather.humidity}%.</p>
            <p>Wind Speed: ${weather.wind_speed} m/s.</p>
            <p>Pressure: ${weather.pressure} hPa.</p>
            <p>Date and Time: ${weather.date}.</p>
        `;
        document.getElementById('weather').style.display = 'block'; 
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather').innerHTML = '<p>Ошибка получения данных о погоде.</p>';
        document.getElementById('weather').style.display = 'block'; 
    }
}
// Функция для получения погоды по геолокации
async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log("Fetching weather for coordinates:", lat, lon);

            try {
                const weather = await eel.get_weather_by_coords(lat, lon)();
                console.log("Weather data received:", weather);  // Выводим данные в консоль

                if (weather.error) {
                    document.getElementById('weather').innerHTML = '<p>Error: ' + weather.error + '</p>';
                    document.getElementById('weather').style.display = 'block';
                    return;
                }

                document.getElementById('weather').innerHTML = `
                    <p>In your location, it is currently ${weather.status}.</p>
                    <p>Temperature: ${Math.round(weather.temp)}°C (Min: ${Math.round(weather.temp_min)}°C, Max: ${Math.round(weather.temp_max)}°C).</p>
                    <p>Humidity: ${weather.humidity}%.</p>
                    <p>Wind Speed: ${weather.wind_speed} m/s.</p>
                    <p>Pressure: ${weather.pressure} hPa.</p>
                    <p>Date and Time: ${weather.date}.</p>
                `;
                document.getElementById('weather').style.display = 'block'; 
            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather').innerHTML = '<p>Ошибка получения данных о погоде.</p>';
                document.getElementById('weather').style.display = 'block'; 
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Применим сохранённую тему при загрузке
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const savedCity = localStorage.getItem('city');
    const savedCountry = localStorage.getItem('country');
    if (savedCity) {
        document.getElementById('city').value = savedCity;
    }
    if (savedCountry) {
        document.getElementById('country').value = savedCountry;
    }

    // Применяем сохранённую тему
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});