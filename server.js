const express=require("express")
require('./config/conection')
const User=require('./models/user')
const productRoutes=require('./routes/product')
const userRoutes=require('./routes/user')
const app=express();
app.use(express.json());

var cors = require('cors')


app.use(cors())

app.use('/prodect',productRoutes)
app.use('/user',userRoutes)
app.use('/getimage',express.static('./.images'))







app.listen(4000,()=>{
    console.log('server work');
})