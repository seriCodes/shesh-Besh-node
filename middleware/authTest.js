const jwt = require('jsonwebtoken')
const testModel = require('../src/model/testModel')

const auth = async (req, res, next) => {
    try {
        console.log("1")

        const token = req.header('Authorization').replace('Bearer ', '')
        console.log("2")
        console.log(process.env.JWT_SECRET)
        console.log(token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("3")
        console.log(decoded)

        const user = await testModel.Test.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log("4")
        if (!user) {
            console.log("no user to authentication")
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth