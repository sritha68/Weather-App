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
        body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
        changeAnimation("https://lottie.host/dd30b5fb-d52c-4bdf-ae8c-ee702ac96318/AGKZZGoVyV.json");

    } else if (weather.includes("rain")) {
        body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
        changeAnimation("https://lottie.host/69eac07f-d0df-4740-a00a-3bf612046fd0/dYPj8CnObP.json");

    } else if (weather.includes("clear")) {
        body.style.background = "linear-gradient(135deg, #56ccf2, #2f80ed)";
        changeAnimation("https://lottie.host/0b390c71-4a59-4427-9c76-c2a18205a01c/8CwSmzNtq8.json");

    } else if (weather.includes("snow")) {
        body.style.background = "linear-gradient(135deg, #83a4d4, #b6fbff)";
        changeAnimation("https://lottie.host/d8064e61-2558-4032-a80d-8b76abbe5f20/LpV1Ayzf7o.json");

    } else {
        body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        changeAnimation("https://lottie.host/dd30b5fb-d52c-4bdf-ae8c-ee702ac96318/AGKZZGoVyV.json");
    }
}
let animation = null;

function changeAnimation(animationURL) {
    const container = document.getElementById("weatherAnimation");

    if (animation) {
        animation.destroy(); // Remove previous animation
    }

    animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationURL
    });
}
