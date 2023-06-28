const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchBtn.addEventListener("click", async () => {
  if (searchInput.value === "") return;
  const weatherData = await fetchWeatherData(searchInput.value);
  return weatherData;
});

// Function to fetch weather data for a given location

async function fetchWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=052eb74f204444b7a5a190133232106&q=${location}&aqi=no`,
      { mode: "cors" }
    );

    if (response.ok) {
      const weatherData = await response.json();

      // Process the JSON data and extract required information
      const processedData = {
        location: weatherData.location.name,
        temperature: weatherData.current.temp_c,
        humidity: weatherData.current.humidity,
        conditions: weatherData.current.condition.text,
        windSpeed: weatherData.current.wind_kph,
      };

      const cityNameElement = document.getElementById("cityName");
      const temperatureElement = document.getElementById("temperature");
      const humidityElement = document.getElementById("humidity");
      const conditionsElement = document.getElementById("condition");
      const windSpeedElement = document.getElementById("wind");

      cityNameElement.textContent = processedData.location;
      temperatureElement.textContent = `Temperature: ${processedData.temperature}°C`;
      humidityElement.textContent = `Humidity: ${processedData.humidity}%`;
      conditionsElement.textContent = `Conditions: ${processedData.conditions}`;
      windSpeedElement.textContent = `Wind Speed: ${processedData.windSpeed} km/h`;

      // return processedData; It shows the object
    } else {
      throw new Error(
        `Error retrieving weather data for ${location}: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}
