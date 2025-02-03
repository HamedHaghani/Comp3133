const express = require('express');

const mongoose = require('mongoose')

const restaurantRoutes = require("./routes/RestaurantRoutes.js")

const app = express();
app.use(express.json());

app.use("/", restaurantRoutes);

const SERVER_PORT = process.env.PORT || 3000


mongoose.connect('mongodb+srv://hamedhaghani:0K7EhdYK1otXaZyQ@clusterone.jbgqy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne' , {
     // useNewUrlParser: true,
     // useUnifiedTopology: true
}).then(success => {
    console.log(`Success Mongodb connection ${success} `)
}).catch(err =>{
    console.log(`Error Mongodb connection ${err}`)
});

app.listen(SERVER_PORT, () =>{
    console.log(`Server is contected to the port number ${SERVER_PORT}`)
})


