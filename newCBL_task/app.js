let express = require('express')

let userRoutes=require('./routers/userRout')
let pumpRoutes=require('./routers/PumpDetailRout')
require('dotenv').config()
require('./databaseconnection/mongooseConnect')
let app = express()

// parse application/x-www-form-urlencoded
// parse application/json
app.use(express.json())

app.use('/',userRoutes,pumpRoutes)

var port=process.env.PORT
app.listen(port, () => {
    console.log('Server is up on port',port)
})


