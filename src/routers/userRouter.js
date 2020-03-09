const expr = require('express')
const router = new expr.Router();
const userModel = require('../model/userModel')
const authenticationCheck = require('../../middleware/authUser')
var qs = require('qs');

router.get('/user/creation',/*auth,*/async (req,res)=>{
    console.log("new user1")
    const newuser = new userModel.User()
        try{
            console.log(req.query.name)

            newuser.name=req.query.name, 
            newuser.password=req.query.password
           console.log(newuser)
            await newuser.save()// database
            const token = await newuser.generateAuthToken()
            res.status(201).send({ newuser, token })
        }catch(e){
            res.status(400).send(e)
        }    
})

router.get('/user/login', async (req, res) => {
    try {
        console.log("new login user")
        console.log(req.query)
        const user = await userModel.User.findByCredentials(req.query.name, req.query.password)
        console.log("new login user2")
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (e) {
       console.log("catch in router")  
        res.status(400).send()
    }
})
router.post('/user/logout', authenticationCheck, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/user/me', authenticationCheck, async (req, res) => {
    console.log("fds")

    res.send(req.user)
})

router.get('/user/profile',authenticationCheck, async (req, res) => {
    try {
        console.log("new profile user")        

        console.log("user profile found")
        //console.log(req.token)
        console.log(req.user)
        res.send(req.user)
    } catch (e) {
       console.log("catch in router")  
        res.status(400).send()
    }
})

// router.patch('/user/rateUp',authenticationCheck, async (req, res) => {
//     try {
//         console.log("new rating +1 user")
//        // console.log(req.query)
//        // const user = await userModel.User.findByCredentials(req.query.name, req.query.password)
//        // console.log("new login user2")
//       //  const token = await user.generateAuthToken()
//       req.user.rating=req.user.rating+1;
//         res.send(req.user)
//     } catch (e) {
//        console.log("catch in router")  
//         res.status(400).send()
//     }
// })
module.exports = router