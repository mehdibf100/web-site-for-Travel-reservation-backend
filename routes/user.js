const express=require("express")
router=express.Router();
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
router.post('/sinup',async (req,res)=>{
    data=req.body
    usr= new User(data)
    salt=bcrypt.genSaltSync(10)
    cryptpass= await bcrypt.hashSync(data.password,salt)
    usr.password=cryptpass
    usr.save()
        .then(
         (saved)=>{
            res.send(saved)
            }
    )
        .catch
            ((err)=>{
             res.send(err)    })

})
router.post('/login',async (req,res)=>{
data=req.body;
console.log(data)
user= await User.findOne({email:data.email})
if(!user){
    res.status(404).send('email or password icorecteeeee')   
}
else{
    validpass=bcrypt.compareSync(data.password, user.password)
    if(!validpass){
        res.status(404).send('email or password icorecte')  
    }
    else{
        payload={
            _id:user.id,
            email:user.email,
            name:user.name
        }
        token=jwt.sign(payload,'22529927')
        res.status(200).send({mytoken:token})  
    }
}


})
router.get('/getall',(req,res)=>{
    User.find()
    .then(
        (users)=>{
            res.send(users)
        }
    )
    .catch
    ((err)=>{
        res.send(err)
    })

})
router.get('/get',async (req,res)=>{
    try{
        
    users= await User.find({age:25})
    res.json(users)

}
catch(error){
    res.send(error)
}

})
router.get('/getbyid/:id',async (req,res)=>{
    try
   { myid=req.params.id;
    user= await User.findOne({ _id:myid })
    res.send(user)
        
   }
    catch(error){
    res.send(error)
            }


})

router.put('/update/:id',async(req,res)=>{
    try
    { id=req.params.id;
    newdata=req.body
     updated= await User.findOneAndUpdate({ _id:id},newdata )
     res.send(updated)
         
    }
     catch(error){
     res.send(error)
             }

})
router.delete('/delete/:id',async (req,res)=>{
    try
   { id=req.params.id;
    user= await User.findOneAndDelete({ _id:id })
    res.send(user)
        
   }
    catch(error){
    res.send(error)
            }

})






module.exports=router;