const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const app = express()
app.use(cors())
app.use(bodyparser.json())
const Data = require("./Data.json")

const _PORT = 5001
app.listen(_PORT, ()=>{
    console.log("server run at", _PORT)
})

app.post("/api/:country/:city/:month/:day/:weekday", (req, res) => {
    const { country, city, month, day, weekday } = req.params;

    if(Data[country] && Data[country][city]){
        const countryTimes = Data[country]
        if(countryTimes){
            const cityTimes = countryTimes[city]
            if(cityTimes){
                res.json(cityTimes[month][day][weekday])
            }else{
                res.status(404).json("no country exist with this")
            }
        }else{
            res.status(404).json("no country exist with this name")
        }
    }
});

