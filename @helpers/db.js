const mongoose = require('mongoose');

async function startDB(){
    try{

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log(`Database connected`);
    }
    catch(error){
        console.log(`Unable to connect to the database: ${error}`);
    }
}

module.exports = startDB