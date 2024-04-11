const express = require('express')
const { db } = require('./config/db')
require('dotenv').config()
const cors = require('cors')

db.connect()
const app = express();
const PORT = 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(PORT,()=>{
    console.log(`listening to PORT: ${PORT}`);
})