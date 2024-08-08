const getOutfitRecommendation = (
  forecastData,
  wardrobe,
  exitTime,
  returnTime
) => {
  const now = new Date(exitTime);
  const endTime = new Date(returnTime);

  // Filter forecasts for the time frame spent outside
  const relevantForecasts = forecastData.properties.periods.filter((period) => {
    const forecastTime = new Date(period.startTime);
    return forecastTime >= now && forecastTime <= endTime;
  });

  // Initialize variables to track extreme weather conditions
  let maxTemp = -Infinity;
  let minTemp = Infinity;
  let maxWindSpeed = -Infinity;
  let maxHumidity = -Infinity;
  let maxPrecipitationProbability = -Infinity;
  let weatherConditions = new Set();
  /*
  The code below helps understand the temperature, wind speed, humididty and precitiptation 
  fluctuation for the relevant time window
   */
  relevantForecasts.forEach((period) => {
    const temperature = period.temperature;
    const windSpeed = parseFloat(period.windSpeed);
    const humidity = period.relativeHumidity.value;
    const precipitationProbability = period.probabilityOfPrecipitation.value;
    const weather = period.shortForecast;

    maxTemp = Math.max(maxTemp, temperature);
    minTemp = Math.min(minTemp, temperature);
    maxWindSpeed = Math.max(maxWindSpeed, windSpeed);
    maxHumidity = Math.max(maxHumidity, humidity);
    maxPrecipitationProbability = Math.max(
      maxPrecipitationProbability,
      precipitationProbability
    );
    weatherConditions.add(weather);
  });

  // Select appropriate clothing items
  const recommendedOutfit = wardrobe.filter((item) => {
    if (item.type === "jacket" && (minTemp < 50 || maxWindSpeed > 20))
      return item;
    if (item.type === "t-shirt" && maxTemp > 70) return item;
    if (item.type === "raincoat" && maxPrecipitationProbability > 50)
      return item; // Adjust threshold as needed
    if (item.type === "breathable" && maxHumidity > 80) return item;
    return null;
  });

  return recommendedOutfit;
};
