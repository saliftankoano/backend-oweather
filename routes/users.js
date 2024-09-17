import express from "express"
// import User from "../schemas/User"
import User from "../schemas/User.js"
import Clothing, { clothingSchema } from "../schemas/Clothing.js"
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
        res.status(200)
    }
    catch{
        res.status(500)
    }
})

router.post("/removeUser", async (req,res)=>{
    // const user = await User.findOne()
})

//TODO: test these routes, make sure they work properly. for example the process of creatin a new User and Clothing object may not work as expected

//add a new article of clothing to user profile
//check if the user is a 
router.post("/addArticle", async (req,res)=>{
    const user_id = req.body.user_id
    const article = req.body.article
    const userDoc = await User.findOne({user_id:user_id})
    const articleDoc = Clothing.create(article)
    userDoc.wardrobe.append(articleDoc)
})

router.post("/getWardrobe", async (req,res)=>{
    const user_id = req.body.user_id
    const userDoc = await User.findOne({user_id:user_id})
    return userDoc.wardrobe
})

router.post("/removeArticle", (req,res)=>{

})

router.post("")

export default router