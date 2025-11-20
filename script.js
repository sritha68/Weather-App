const apiKey = "07e069bc7f810dd0e6e3630a58d0170f";
async function getWeather() {
    document.getElementById("loader").style.display = "block";

    try {
        const city = document.getElementById("cityInput").value;
        if (!city) {
            alert("Please enter a city name");
            return;
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
    const errData = await response.json();
    document.getElementById("weatherBox").innerHTML = `<p>${errData.message}</p>`;
    return;
}

        const data = await response.json();
        changeBackground(data.weather[0].main.toLowerCase());

        document.getElementById("weatherBox").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
            <p><strong>${data.main.temp}°C</strong></p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>${data.weather[0].description}</p>
        `;
        document.getElementById("loader").style.display = "none";

    } catch (error) {
        console.log("Error:", error);
        document.getElementById("weatherBox").innerHTML = "<p>Error fetching data</p>";
    }

}
document.getElementById("cityInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
function changeBackground(weather) {
    const body = document.body;

    if (weather.includes("cloud")) {
        body.style.background = "url('cloudy.avif') no-repeat center/cover";
    } else if (weather.includes("rain")) {
        body.style.background = "url('rain.jpg') no-repeat center/cover";
    } else if (weather.includes("clear")) {
        body.style.background = "url('clear.jpg') no-repeat center/cover";
    } else if (weather.includes("snow")) {
        body.style.background = "url('snow.jpg') no-repeat center/cover";
    } else {
        body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
    }
}
