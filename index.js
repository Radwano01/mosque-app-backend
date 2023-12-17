const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

const _PORT = 5001
app.listen(_PORT, ()=>{
    console.log("server run at", _PORT)
})

app.get("/api/:country/:city/:month/:day/:weekday", async(req, res) => {
    const { country, city, month, day, weekday } = req.params;

    const Data = await fetch("https://radwano01.github.io/prayTimes-Data/Data.json")
    if(Data[country] && Data[country][city]){
        const countryTimes = Data[country]
        if(countryTimes){
            const cityTimes = countryTimes[city]
            if(cityTimes){
                res.status(200).json(cityTimes[month][day][weekday])
            }else{
                res.status(404).json("no country exist with this")
            }
        }else{
            res.status(404).json("no country exist with this name")
        }
    }
});

