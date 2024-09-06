const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT || 5000;

// middlware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello Esmatullah");
})

app.listen(port,()=>{
    console.log(`you are listening on port ${port}`);
})