if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const startDB = require('./@helpers/db')
const authRouter = require('./routes/auth.routes')
const bookRouter = require('./routes/book.routes')
const donorRouter = require('./routes/donor.routes')


const app = express()
startDB()

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const api_version = "v1"
app.use(`/${api_version}/auth`, authRouter)
app.use(`/${api_version}/books`, bookRouter)
app.use(`/${api_version}/donor`, donorRouter)



const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`server running at port: ${port}`);
})