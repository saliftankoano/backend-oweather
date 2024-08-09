import { getOutfitRecommendation } from "./functions";
import express from "express";
import axios from "axios";

const app = express();
const port = 8080;

app.use(express.json());

const wardrobe = [
  { id: 1, type: "jacket", material: "wool", warmth: "high" },
  { id: 2, type: "t-shirt", material: "cotton", warmth: "low" },
  { id: 3, type: "raincoat", material: "polyester", warmth: "medium" },
  { id: 4, type: "breathable", material: "nylon", warmth: "low" },
];
// This funciton retrieves the office ID responsible for the the user's current location
const getOffice = async (longitude, latitude) => {
  const url = `https://api.weather.gov/points/${longitude}%2C${latitude}`;
  const response = await axios.get(url);
  const office = response.properties.cwa;
  return office;
};
// Function to fetch hourly forecast data from National Weather Service API
const fetchHourlyForecast = async (longitude, latitude) => {
  const office = getOffice(longitude, latitude);
  const url = `https://api.weather.gov/gridpoints/${office}/${longitude},${latitude}/forecast/hourly?units=us`;
  const response = await axios.get(url);
  return response.data;
};

app.get(`/weather/:longitude/:latitude`, async (req, res) => {
  const { longitude, latitude } = req.params;
  const weather = await fetchHourlyForecast();
  const outfit = getOutfitRecommendation();
  console.log(`${weather}`);
});

app.get(`/outfit/:longitude/:latitude/:exit/:return`, async () => {
  const { longitude, latitude } = req.params;
  const weather = await fetchHourlyForecast(longitude, latitude);
  const outfit = getOutfitRecommendation(weather, wardrobe);
  console.log(`${weather}`);
});
app.get("/wardrobe/", async () => {
  console.log(`Send back the entire wardrobe`);
});

app.listen(port, async () => {
  console.log(`Listening from port: ${port}`);
});
