const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
const mongooseConnection = require("./helpers/mongoose-connection");
const appRoutes = require("./routes");
const cron = require("./cron")

const corsOptions = {
    // origin: 'http://localhost:3000'
    origin: '*'
}

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//add cors
app.use(cors(corsOptions));

app.use("/api", appRoutes);

app.use((_, res) =>{
    res.send({
        message: 'Not found!'
    })
});

mongooseConnection();

app.listen(5000, (req, res)=>{
    console.log("Server is listening on port 5000");
})