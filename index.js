const express = require('express');
const app = express();
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: '*'
  })
);

const baseURL = 'http://dataservice.accuweather.com';

app.get('/', async (req, res) => {
  res.send('Working!');
});

app.post('/get-city', async (req, res) => {
   const { city } = req.body;

  try {
    const baseEndPoint = `${baseURL}/locations/v1/cities/search`

    const requestCity = await axios.request(
      `${baseEndPoint}?apikey=${process.env.ACCUWEATHER_KEY}&q=${city}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )

    const result = requestCity.data;

    res.status(200).send(result);
  } catch(err) {
    res.status(500).send(err);
  }

});

app.post('/get-weather', async (req, res) => {
  const { key } = req.body;

 try {
   const baseEndPoint = `${baseURL}/currentconditions/v1/${key}`

   const requestCity = await axios.request(
     `${baseEndPoint}?apikey=${process.env.ACCUWEATHER_KEY}`,
     {
       method: 'GET',
       headers: { 'Content-Type': 'application/json' }
     }
   )

   const result = requestCity.data;

   res.status(200).send(result);
 } catch(err) {
   res.status(500).send(err);
 }

});



const PORT = process.env.PORT || 6000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));