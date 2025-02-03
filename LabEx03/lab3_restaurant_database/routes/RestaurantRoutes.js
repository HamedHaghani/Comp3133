const express = require('express');
const restaurantModel = require('../models/reastaurant');


const app = express();



app.get('/restaurants',async (req, res)=>{
    const restaurant = await restaurantModel.find({});

    try{
        console.log(restaurant[0].cuisine)
        res.status(200).send(restaurant);
    } catch(err){
        res.status(500).send(err);
    }

})



app.get('/restaurants', async(req, res) =>{
    try{
        const sortBy = req.params.sortBy;
        let sortOrder = 1;
        if (sortBy && sortBy.toUpperCase() === "DESC"){
            sortOrder = -1
        }
    

    const restaurants = await restaurantModel.find({}).select("id cuisines restaurantname city restaurant_id").sort({restaurant_id: sortOrder});
    
    res.status(200).json(restaurants)


    }catch(error) {
        res.status(500).send(error);
    }


})






app.get('/restaurant/cuisine/:cuisine', async(req,res) =>{
    const cuisine = req.params.cuisine;

    const restaurant = await restaurantModel.find({cuisine : cuisine});

    try {
        if (restaurant.length != 0 ){
            res.send(restaurant);
        }else{
            res.send(JSON.stringify({status: false, message: "No data found"}))

        }
    }catch(err){
        res.status(500).send(err);

    }

})

app.get("/restaurants/Delicatessen", async (req, res) => {
    try {
      const restaurants = await restaurantModel.find(
        { cuisine: "Delicatessen", city: { $ne: "Brooklyn" } }, 
        { _id: 0, cuisine: 1, restaurantname: 1, city: 1 } 
      ).sort({ restaurantname: 1 }); 
  
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No matching restaurants found" });
      }
  
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error fetching restaurants", error });
    }
  });


  app.post("/restaurants", async (req, res) => {
    try {
      const { restaurantname, restaurant_id, city, cuisine, rating } = req.body;
  
     
      if (!restaurantname || !restaurant_id || !city || !cuisine) {
        return res.status(400).json({ message: "Please provide all required fields: restaurantname, restaurant_id, city, cuisine" });
      }
  
      
      const newRestaurant = new restaurantModel({
        restaurantname,
        restaurant_id,
        city,
        cuisine,
        rating: rating || 1, 
      });
  
      
      await newRestaurant.save();
      res.status(201).json({ message: "Restaurant added successfully!", restaurant: newRestaurant });
  
    } catch (error) {
      res.status(500).json({ message: "Error adding restaurant", error: error.message });
    }
  });


  module.exports = app