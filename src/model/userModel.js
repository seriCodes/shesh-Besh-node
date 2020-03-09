const mongoose = require('mongoose')
//const validator = require('validator')
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//new mongoose.Schema
const userSchma = new mongoose.Schema( {
    name:{
        type: String,
        required: true,
        unique: true,
      //  trim: true
    },
    password:{
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],

    rating:{
        type: Number,
        required: true,
        default:10
    }
})

 userSchma.plugin(uniqueValidator);

 userSchma.statics.findByCredentials = async (name, password) => {
    console.log("findByCredentials 1")
    
    const user = await User.findOne({ name })
    
    console.log(user)
    if (!user) {
        console.log("Unable to login bc Credentials")

        throw new Error('Unable to login')
    }
    console.log(user.password)

    const isMatch =await bcrypt.compare(password, user.password)

    if (!isMatch) {
        console.log("Unable to login 2")

        throw new Error('Unable to login')
    }
    console.log("return user")

    return user
}
userSchma.pre('save', async function (next) {
    const user = this    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchma.methods.generateAuthToken = async function () {
    console.log("generateAuthToken  ")

    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    console.log("generateAuthToken 1 ")

    return token
}



userSchma.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject._id

    return userObject
}
const User= new mongoose.model('User', userSchma)

module.exports = {
    User,    
} ;