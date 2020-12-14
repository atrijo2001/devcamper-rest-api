const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')

const errorHandler = require('./middleware/error')

//Load ENV VARS

dotenv.config({path: './config/config.env'})

//Route Files
const bootcamps = require('./Routes/Bootcamps')
const connectDB = require('./config/db')


// Connect to database
connectDB()



const app = express()

//Body Parser
app.use(express.json())


//Dev logging middleware
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'))
}

//Mount Routers
app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${process.env.PORT}`.yellow.bold))

//Handle unhandled promise rejections
process.on('Unhandled rejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    //Close the server and exit
    server.close(() => {
        process.exit(1)
    })
})