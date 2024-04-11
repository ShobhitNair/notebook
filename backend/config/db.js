const mongoose = require('mongoose')

const connect = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log(`db is connected successfully`);
    }).catch((err)=>{
        console.log(`can't connect to db + ${err}`);
    })

}

module.exports = {
    db:{
        connect
    }
  };
