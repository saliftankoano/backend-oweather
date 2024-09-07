import express from "express"
// import User from "../schemas/User"
import User from "../schemas/User.js"
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

//add a new article of clothing to user profile
//check if the user is a 
router.post("/addArticle", (req,res)=>{
    const user_id = req.body.user_id
    const article = req.body.article
})

router.post("/getWardrobe", (req,res)=>{

})

router.post("/removeArticle", (req,res)=>{

})

router.post("")

export default router