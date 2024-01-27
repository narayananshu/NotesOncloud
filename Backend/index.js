const mongoose =require('mongoose');
PORT =5000;
DB_URL='mongodb://0.0.0.0/backend';
mongoose.connect(DB_URL);
const conn =mongoose.connection;
conn.once('open', ()=>{ 
    console.log( "Successfull connection of ");
})
conn.on('err', ()=>{ 

    console.log("Connection error");  
    
})
const express = require('express')
const app = express()
const port = 5000
// app.get('api/vlog/login', (req, res) => {
//   res.send('Hello login!')
// })
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})