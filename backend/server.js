require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const path = require('path')

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", port)
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts', workoutRoutes)

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })
    .catch((error) => {
    console.log(error)
})
