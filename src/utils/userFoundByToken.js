const userModel = require('../model/userModel')
const findUserByToken = async (token) => {
    try {
        console.log("userFoundByToken check")
        console.log(token)

        const user = await userModel.User.findOne({'tokens.token': token })
        
        if (!user) {
            console.log("no user to userFoundByToken")
            throw new Error()
        }
        console.log('the user found and will return')

        console.log(user.name)
        return user;
    } catch (e) {
        res.status(401).send({ error: 'error in finding user to rate up.' })
    }
}

module.exports = findUserByToken