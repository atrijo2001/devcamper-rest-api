const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')


//Load env variables
dotenv.config({path: './config/config.env'})

//Load Models
const Bootcamp = require('./Models/Bootcamp')

//Connect to database
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

//Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

//Import into the DB
const ImportData = async() => {
    try {
        await Bootcamp.create(bootcamps)

        console.log('Data imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(error);
        
    }
}

//Delete Data
const deleteData = async() => {
    try {
        await Bootcamp.deleteMany()
        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(error);
        
    }
}

if(process.argv[2] === '-i'){
    ImportData()
} else if(process.argv[2] === '-d'){
    deleteData()
}