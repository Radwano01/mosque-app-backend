const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config

const _PORT = 5001;
app.listen(_PORT, () => {
  console.log("server run at", _PORT);
});

app.get("/api/:country/:city/:month/:day/:weekday", async (req, res) => {
  const { country, city, month, day, weekday } = req.params;

  try {
    const response = await axios.get(process.env.DATA_API);
    const Data = response.data;

    if (Data[country] && Data[country][city]) {
      const countryTimes = Data[country];

      if (countryTimes) {
        const cityTimes = countryTimes[city];

        if (cityTimes) {
          if (cityTimes[month] && cityTimes[month][day] && cityTimes[month][day][weekday]) {
            res.status(200).json(cityTimes[month][day][weekday]);
          } else {
            res.status(404).json("No prayer times available for the specified date and weekday.");
          }
        } else {
          res.status(404).json("No city exists with this name.");
        }
      } else {
        res.status(404).json("No country exists with this name.");
      }
    } else {
      res.status(404).json("No data available for the specified country and city.");
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json("Internal Server Error");
  }
});
