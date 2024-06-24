class WeatherApp {
  constructor() {
    this.apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
    this.apiBaseUrl = "https://api.openweathermap.org/data/2.5/weather";
    this.init();
  }

  init() {
    document
      .querySelector("#search")
      .addEventListener("submit", (event) => this.handleSubmit(event));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const cityName = document.querySelector("#city_name").value;

    if (!cityName) {
      this.hideWeatherInfo();
      this.showAlert("Você precisa digitar uma cidade...");
      return;
    }

    const apiUrl = `${this.apiBaseUrl}?q=${encodeURI(cityName)}&appid=${
      this.apiKey
    }&units=metric&lang=pt_br`;
    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
      this.showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
      });
    } else {
      this.hideWeatherInfo();
      this.showAlert("Não foi possível localizar...");
    }
  }

  showInfo(json) {
    this.showAlert("");

    document.querySelector("#weather").classList.add("show");
    document.querySelector(
      "#title"
    ).innerHTML = `${json.city}, ${json.country}`;
    document.querySelector("#temp_value").innerHTML = `${json.temp
      .toFixed(1)
      .toString()
      .replace(".", ",")} <sup>C°</sup>`;
    document.querySelector(
      "#temp_description"
    ).innerHTML = `${json.description}`;
    document
      .querySelector("#temp_img")
      .setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
      );
    document.querySelector("#temp_max").innerHTML = `${json.tempMax
      .toFixed(1)
      .toString()
      .replace(".", ",")} <sup>C°</sup>`;
    document.querySelector("#temp_min").innerHTML = `${json.tempMin
      .toFixed(1)
      .toString()
      .replace(".", ",")} <sup>C°</sup>`;
    document.querySelector("#humidity").innerHTML = `${json.humidity}%`;
    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(
      1
    )}km/h`;
  }

  showAlert(msg) {
    document.querySelector("#alert").innerHTML = msg;
  }

  hideWeatherInfo() {
    document.querySelector("#weather").classList.remove("show");
  }
}

// Inicializa a aplicação
document.addEventListener("DOMContentLoaded", () => {
  new WeatherApp();
});
