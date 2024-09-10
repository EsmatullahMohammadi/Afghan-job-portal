const express=require('express');
const app=express();
const cors=require('cors');
const port=process.env.PORT || 3000;

require('dotenv').config()
console.log(process.env)

// userName:  esmatullah1382
// password: fyCEXoGhAUnK7xVx

// middlware
app.use(express.json());
app.use(cors());

// Connect to mongo DB
const { MongoClient, ServerApiVersion}=require('mongodb');
const uri = "mongodb+srv://esmatullah1382:fyCEXoGhAUnK7xVx@job-portal-demo.teqzn.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo";

const client=new MongoClient(uri, {
    serverApi:{
        version:ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run(){
    try{
        await client.connect();
        const db=client.db("mernPortalJob");
        const jobsCollection=db.collection("demoJobs");

        // post a job
        app.post('/post-job', async(req,res)=>{
            const body=req.body;
            body.createAt= new Date();
            // console.log(body);
            const result= await jobsCollection.insertOne(body);
            if(result.insertedId){
                return res.status(200).send(result);
            }else{
                return res.status(404).send({
                    message: "can not insert! try again later",
                    status: false
                })
            }
        })

        // get all Jobs
        app.get('/all-jobs',async(req,res)=>{
            const jobs=await jobsCollection.find({}).toArray()
            res.send(jobs)
        })

        console.log("pigned your deployment. you successfully connected to mongodb!");
    } finally{
        await client.close();
    }
}
run().catch(console.dir)
// end of connecting to mongo DB


app.get('/',(req,res)=>{
    res.send("Hello Esmatullah");
})

app.listen(port,()=>{
    console.log(`you are listening on port ${port}`);
})