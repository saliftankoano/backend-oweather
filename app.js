import express from "express";
const app = express();
const port = 8080;

import { getOutfitRecommendation } from "./functions";
app.use(express.json());

const getOffice = async (location) => {
  const { lon, lat } = location;
  const url = `https://api.weather.gov/points/${lon}%2C${lat}`;
  const response = await axios.get(url);
  const office = response.properties.cwa;
  return office;
};
// Function to fetch hourly forecast data from National Weather Service API
const fetchHourlyForecast = async (location) => {
  const office = getOffice(location);
  const { lon, lat } = location;

  const url = `https://api.weather.gov/gridpoints/${office}/40,73/forecast/hourly?units=us`;
  const response = await axios.get(url);
  return response.data;
};

app.get("/weather", () => {
  console.log(`Send back the wardrobe`);
});

app.get("/wardrobe/:userid/clothes", () => {
  console.log(`Send back the wardrobe`);
});

app.listen(port, () => {
  console.log(`Listening from port: ${port}`);
});
