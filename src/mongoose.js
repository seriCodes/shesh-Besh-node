const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
mongoose.connection.on('connected', function(){
    console.log("connected to db")
})

mongoose.connection.on('disconnected', function(){
    console.log("disconnected to db")
})