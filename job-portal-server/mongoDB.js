
const express=require('express');
const app=express();
const cors=require('cors');
const mongoose= require("mongoose");
const port=process.env.PORT || 3000;

require('dotenv').config()
// console.log(process.env)

// middlware
app.use(express.json());
app.use(cors());

// Connect to mongo DB
const connect=mongoose.connect("mongodb://localhost:27017/mernPortalJob")
// console.log(connect)
const userSchema= new mongoose.Schema({
    name: String,
    lastName: String,
    Adress: String
})
const userModel=mongoose.model("demoJobs",userSchema);

 // post a job
 app.post('/post-job', async (req, res) => {
    try {
        const body = req.body;
        body.createdAt = new Date(); // Changed to `createdAt`
        
        const result = await userModel.insertOne(body);

        if (result.insertedId) {
            return res.status(200).send(result);
        } else {
            return res.status(500).send({
                message: "Unable to insert! Try again later.",
                status: false
            });
        }
    } catch (error) {
        // Catch any potential error
        return res.status(500).send({
            message: "Server error. Please try again later.",
            status: false,
            error: error.message // Send error message for debugging
        });
    }
});

// get the jobs
app.get('/all-jobs',async(req,res)=>{
    const jobs=await userModel.find({}).then(jobs=> {
        res.json(jobs)
        console.log(jobs)
    }).catch(err=>{
        console.log(err)
    })

})


app.get('/',(req,res)=>{
    res.send("Hello Esmatullah");
})

app.listen(port,()=>{
    console.log(`you are listening on port ${port}`);
})