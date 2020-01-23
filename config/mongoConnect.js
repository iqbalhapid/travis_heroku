const mongoose = require('mongoose')

const connectMongo = async () => {
    try{
        const url = "mongodb+srv://iqbalhapid:arabehel@shopjoy-ywn6e.mongodb.net/shopjoy"
        await mongoose.connect(url, {
            useNewUrlParser : true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('MongoDB connect at : '+url)
        mongoose.set('debug', true)
    }catch{
        process.exit(1)
    }
}

module.exports = {connectMongo}