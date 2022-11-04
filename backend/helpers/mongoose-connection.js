var mongoose = require("mongoose");
const mongoAtlasUri = `mongodb://localhost:27017/scheduler`

function mongooseConnection(){
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(
            mongoAtlasUri,
            options,
            // { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log("Mongoose is connected"),
        );
    } catch (e) {
        console.log("could not connect");
    }
    const dbConnection = mongoose.connection;
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
    dbConnection.once("open", () => console.log("Connected to DB!"));

}

module.exports = mongooseConnection;