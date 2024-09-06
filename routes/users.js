const express = require("express")
const User = require("../schemas/User")
const router = express.Router()

router.get("/",(req,res)=>{

})

//add a user upon initial sign up to the database
router.post("/addUser", async (req,res)=>{
    const userObj = req.body.user
    //the user object is supposed to resemble the user schema in mongo
    //should include the user_id, customer_id and wardrobe (empty array of objects)
    try{
        const user = await User.create(userObj)
        user.save()
        res.status(200)
    }
    catch{
        res.status(500)
    }
})

router.post("/removeUser",(req,res)=>{

})

//add a new article of clothing to user profile
//check if the user is a 
router.post("/", (req,res)=>{
    const data = req.body
    
})