export const getOutfitRecommendation = (
  forecastData,
  wardrobe,
  exitTime,
  returnTime
) => {
  const now = new Date(exitTime);
  const endTime = new Date(returnTime);
  console.log(now);
  console.log(endTime);

  // Filter forecasts for the time frame spent outside
  const relevantForecasts = forecastData.properties.periods.filter((period) => {
    const forecastTime = new Date(period.startTime);
    console.log(forecastTime);
    return forecastTime >= now && forecastTime <= endTime;
  });
  console.log(relevantForecasts);

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
    if (item.type === "jacket" && (minTemp < 50 || maxWindSpeed > 20)) {
      console.log(`Added a ${item.type}`);
      return item;
    }
    if (item.type === "t-shirt" && maxTemp > 70) {
      console.log(`Added a ${item.type}`);
      return item;
    }
    if (item.type === "raincoat" && maxPrecipitationProbability > 50) {
      console.log(`Added a ${item.type}`);
      return item;
    }
    if (item.type === "breathable" && maxHumidity > 80) {
      console.log(`Added a ${item.type}`);
      return item;
    }
    return null;
  });

  return recommendedOutfit;
};

//TODO: method should return a list of possibilities for an outfit based on the colors given
const pickByColor = (wardrobeDoc)=>{
  // get colors of wardrobe pieces
  const colors = wardrobeDoc.map((article)=>{
    return article.color
  })

  // create a color pallete
  // analogous, monochrome, completementary 

  // use the color pallete with which clothes are available

}
