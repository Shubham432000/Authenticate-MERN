const express=require('express')
const app=express()
require("./db/database")
const users = require("./models/UserSchema")
const mongoose = require("mongoose")
const router = require("./routes/router")
app.use(express.json())

app.use(router)
const port=8003
app.listen(port,()=>{
    console.log(`server is start port no ${port}`)
    
})
