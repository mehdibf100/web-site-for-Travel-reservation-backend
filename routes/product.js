const express=require("express")
router=express.Router();
const Product=require('../models/product')
const multer=require("multer")
filename='';
const mystorage=multer.diskStorage({
    destination:'.images',
    filename:(req,file,redirect)=>{
        let date = Date.now();
        let fl=date +'.'+file.mimetype.split('/')[1];
        redirect(null,fl);
        filename="http://localhost:4000/getimage/"+fl;
    }

})
const upload=multer({storage:mystorage});
//add product
router.post('/add',upload.any('image'),async (req,res)=>{
    try{
    data=req.body;
    
    prod=new Product(data)
    prod.image=filename
    savedProduct=await prod.save()
    res.status(200).send(savedProduct)
}
    catch(error){
        res.status(400).send(error)
    }
})
//get product

router.post('/getall',async (req,res)=>{
    try{
        
        hotelname=req.body;
        console.log(hotelname)
        producd= await Product.find(hotelname)
    res.send(producd)
    console.log(producd)
}
catch(error){
    res.send(error)
}

})

//delete product

router.delete('/delete/:id',async (req,res)=>{
    try
   { id=req.params.id;
    prod= await Product.findOneAndDelete({ _id:id })
    res.send(prod)
        
   }
    catch(error){
    res.send(error)
            }

})
//update product
router.put('/update/:id',async(req,res)=>{
    try{
    id=req.params.id;
    newdata=req.body
    updatedprod= await Product.findOneAndUpdate({ _id:id},newdata )
    res.send(updatedprod)
    }
    catch(error){
        res.send(error)
                }
})





module.exports=router;