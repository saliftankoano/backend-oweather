import { getOutfitRecommendation } from "./functions.js";
import axios from "axios";
const express = require("express")
const cors = require('cors')
require('dotenv').config()

const usersRoute = require("./routes/users.js")

const app = express();
const port = 8080;

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGOURI)

app.use(express.json());
app.use(
  cors({
    origin:[
      "http://kazedra.com/",
      // "http://kazedra.com/*"
    ]
  }
  )
)

app.use(usersRoute,"/users")

// Testing data
const wardrobe = [
  { id: 1, type: "jacket", material: "wool", warmth: "high" },
  { id: 2, type: "t-shirt", material: "cotton", warmth: "low" },
  { id: 3, type: "raincoat", material: "polyester", warmth: "medium" },
  { id: 4, type: "breathable", material: "nylon", warmth: "low" },
];

// Get user's local weather office ID
const getOffice = async (latitude, longitude) => {
  const url = `https://api.weather.gov/points/${latitude}%2C${longitude}`;
  try {
    const response = await axios.get(url);
    const office = response.data.properties.cwa;
    return office;
  } catch (error) {
    console.error("Error fetching office data:", error);
    throw error;
  }
};
// Get weather data hourly | Note that this API gives us 7 days of forecast
const fetchHourlyForecast = async (latitude, longitude) => {
  const roundLatitude = Math.abs(Math.round(latitude));
  const roundLongitude = Math.abs(Math.round(longitude));

  const office = await getOffice(latitude, longitude);
  const url = `https://api.weather.gov/gridpoints/${office}/${roundLatitude},${roundLongitude}/forecast/hourly?units=us`;
  const response = await axios.get(url);
  return response.data;
};

app.get(`/weather/:latitude/:longitude`, async (req, res) => {
  const { latitude, longitude } = req.params;
  const weather = await fetchHourlyForecast(latitude, longitude);
  if (weather) {
    res.status(200).send(weather);
  } else {
    res.status(400);
  }
});

app.get(`/outfit/:latitude/:longitude`, async (req, res) => {
  const { latitude, longitude } = req.params;
  const weather = await fetchHourlyForecast(latitude, longitude);
  const exitTime = "2024-08-09T15:00:00-04:00"; // ISO string format
  const returnTime = "2024-08-09T18:00:00-04:00";
  const outfit = getOutfitRecommendation(
    weather,
    wardrobe,
    exitTime,
    returnTime
  );
  // console.log(outfit);
  if (outfit) {
    res.status(200).send(outfit);
  } else {
    res.status(400).send("No outfit suggestion found");
  }
});

app.get("/wardrobe/", async (req, res) => {
  console.log(`Send back the entire wardrobe`);
});

app.listen(port, async () => {
  console.log(`Listening from port: ${port}`);
});

app.post("/user",(req,res)=>{
  
})