const expr = require('express')
const router = new expr.Router();
const testModel = require('../model/testModel')

const authenticationCheck = require('../../middleware/authTest')


router.post('/tes',/*auth,*/ async (req,res)=>{ //
    
    console.log(req.body)
 const newTest = new testModel.Test(req.body)//
    try{
        console.log("try new test")
      await newTest.save()// database      
      const token = await newTest.generateAuthToken()
      console.log(token)
      res.status(201).send({ newTest, token })
    }catch(e){
        res.status(400).send(e)
    }    
})

router.post('/tes/login', async (req, res) => {
    try {
        console.log("new login test")
        console.log(req.body)

        const test = await testModel.Test.findByCredentials(req.body.name, req.body.password)
        console.log("new login test2")
        const token = await test.generateAuthToken()

        res.send({ test, token })
    } catch (e) {
       console.log(e)
  
        res.status(400).send()
    }
})
router.get('/tes/me', authenticationCheck, async (req, res) => {
    console.log("עקא")

    res.send(req.user)
})
router.delete('/tes/delete', async (req, res) => {
    try {
        console.log("delete")

       await testModel.Test.deleteMany({})
        console.log("delete2")

            res.status(404).send()
       

    } catch (e) {
        console.log("delete3")

        res.status(500).send()
    }
})

module.exports = router