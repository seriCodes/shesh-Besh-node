const jwt = require('jsonwebtoken')
const userModel = require('../src/model/userModel')

const auth = async (req, res, next) => {
    try {
        console.log("auth check")

        console.log(req.headers)
        const token = req.headers.authentication.replace('Bearer ', '')
       // console.log(process.env.JWT_SECRET)
        console.log(token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const user = await userModel.User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            console.log("no user to authentication")
            throw new Error()
        }
        req.token = token
        req.user = user
        console.log(user)

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth