const mongoose=require('mongoose')


const DBS="mongodb+srv://shubham7410112997:aher@cluster0.kdcwrxv.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(DBS,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
   console.log("connections start")
}).catch((error)=>{
    console.log(error.message)
})