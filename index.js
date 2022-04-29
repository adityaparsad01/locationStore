//IM Server
const express = require("express");
const app = express();
const Datastore = require("nedb");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));
const database = new Datastore("database.db");
database.loadDatabase()

app.get("/api",(req,res)=>{
    database.find({},(err,data)=>{
        res.json(data);
    });
});

app.post("/api", (req, res) => {
    const data = req.body;
    database.insert(data);
  res.json({
    status: "success",
    message: "comming from server",
    timestamp: data.time,
    latitude: data.lat,
    longitude: data.lon,
    mood: data.mood,
  });
});
