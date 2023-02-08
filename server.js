const express = require("express")
const https = require("https")
const cors = require('cors')

const db = require("./config/connection")
const PORT = 8080

const app = express()

//Middleware to parse incoming data format
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Allow cross-origin access
app.use(
    cors({
        origin: "*" //Update to match the domain you will make requests from
    })
)

const server = new https.createServer(app)

db.once('open', () => {
    server.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`)
    })
})