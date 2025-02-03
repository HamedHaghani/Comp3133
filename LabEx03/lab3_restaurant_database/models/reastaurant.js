const mongoose = require('mongoose');


const RestaurantSchema = new mongoose.Schema({
    restaurantname:{
        type: String,
        required:[true, "Please Enter the name"],
        lowercase:true,
    },

    restaurant_id : {
        type: String, 
        required: true,
        unique: true,
    },

    city:{
        type: String, 
        required: true,
        lowercase:true,

    },

    cuisine:{
        type: String,
        required: true,
        
    },

    rating: {
        type: Number,
        default: 1,
        validate: function(value){
            if (value < 1 || value > 5){
                throw new Error("Insert a number between 1 to 5 ")
                
            }
        }
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});




const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;