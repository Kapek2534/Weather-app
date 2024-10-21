document.querySelector('.getWeather').addEventListener('click', function() {
    const city = document.querySelector('.cityInput').value;
    const apiKey = config.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const cityName = data.name;
                const temperature = data.main.temp;
                const conditions = data.weather[0].description;
                const pressure = data.main.pressure;
                const wind = data.wind.speed;
                const timezone = data.timezone;
                const local = new Date().getTimezoneOffset() * 60;

                const sunrise = new Date((data.sys.sunrise + timezone + local) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const sunset = new Date((data.sys.sunset + timezone + local) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const weatherInfo = [
                    { selector: '.result h2', text: cityName },
                    { selector: '.temperature p', text: `${temperature} °C` },
                    { selector: '.conditions p', text: `${conditions}` },
                    { selector: '.pressure p', text: `${pressure} hPa` },
                    { selector: '.wind p', text: `${wind} km/h` },
                    { selector: '.sunrise p', text: `${sunrise}` },
                    { selector: '.sunset p', text: `${sunset}` }
                ];

                weatherInfo.forEach(info => {
                    document.querySelector(info.selector).textContent = info.text;
                })

            } else {
                alert('City was not found');
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
});