const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken')

//const validator = require('validator')


const testSchma = new mongoose.Schema({
    name:{
        unique: true,
        type: String,
        required: true,        
},
    password:{
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]


})
testSchma.plugin(uniqueValidator);

testSchma.statics.findByCredentials = async (name, password) => {
    console.log("findByCredentials 1")
    
    const test = await Test.findOne({ name:name })
    
    console.log(test)
    if (!test) {
        console.log("Unable to login 1")

        throw new Error('Unable to login')
    }
    console.log(test.password)

    const isMatch =await bcrypt.compare(password, test.password)

    if (!isMatch) {
        console.log("Unable to login 2")

        throw new Error('Unable to login')
    }
    console.log("show test")

    return test
}

testSchma.pre('save', async function (next) {
    const test = this    
    if (test.isModified('password')) {
        test.password = await bcrypt.hash(test.password, 8)
    }

    next()
})

testSchma.methods.generateAuthToken = async function () {
    console.log("cc")

    const test = this
    const token = jwt.sign({ _id: test._id.toString() },process.env.JWT_SECRET )

    test.tokens = test.tokens.concat({ token })
    await test.save()

    return token
}


const Test= new mongoose.model('Test', testSchma)

module.exports ={
    Test,
    //doit
} ;



// function doit(){
//     console.log("bla")
// }
