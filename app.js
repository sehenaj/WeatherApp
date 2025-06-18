const place = document.querySelector("input");
const msgcontainer = document.querySelector(".hide-display");
const error = document.querySelector(".er");
const body = document.querySelector(".total");

place.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 13) {
        evt.preventDefault();
        const name = evt.target.value.trim();
        if (name === "") return;

        getdata(name);
    }
});

const getdata = async (name) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8546a0ad0f8e7773e80c00b42a59e720&units=metric`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector("#city").innerHTML = data.name;
        document.querySelector("#temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector("#sky").innerHTML = data.weather[0].main;
        document.querySelector("#humidityCheck").innerHTML = data.main.humidity + "%";
        document.querySelector("#windspeed").innerHTML = Math.round(data.wind.speed) + " km/h";

        // Show the container, hide error
        msgcontainer.style.display = "block";
        error.classList.add("hide");

        // Change background image based on weather
        const condition = data.weather[0].main;
        let bgImage = "";

        if (condition === "Clouds") bgImage = "./images/clouds.jpg";
        else if (condition === "Haze") bgImage = "./images/haze.jpg";
        else if (condition === "Clear") bgImage = "./images/clear.avif";
        else if (condition === "Rain") bgImage = "./images/rain.jpg";
        else if (condition === "Mist") bgImage = "./images/mist.avif";

        if (bgImage !== "") {
            document.body.style.backgroundImage = `url(${bgImage})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
        }

    } catch (err) {
        msgcontainer.style.display = "none";
        document.body.style.background = "rgba(83, 91, 84, 0.1)";
        error.classList.remove("hide");
    }
};
