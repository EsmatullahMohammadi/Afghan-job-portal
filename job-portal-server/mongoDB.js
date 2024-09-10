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
// const { MongoClient, ServerApiVersion}=require('mongodb');
// const dbURI= 'mongodb://localhost:27017/';

// const client=new MongoClient(dbURI, {
//     serverApi:{
//         version:ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
// async function run(){
//     try{
//         await client.connect();
//         const db=client.db("mernPortalJob");
//         const jobsCollection=db.collection("demoJobs");

//         // post a job
//         app.post('/post-job', async(req,res)=>{
//             const body=req.body;
//             body.createAt= new Date();
//             // console.log(body);
//             const result= await jobsCollection.insertOne(body);
//             if(result.insertedId){
//                 return res.status(200).send(result);
//             }else{
//                 return res.status(404).send({
//                     message: "can not insert! try again later",
//                     status: false
//                 })
//             }
//         })

//         // get all Jobs
//         app.get('/all-jobs',async(req,res)=>{
//             const jobs=await jobsCollection.find({}).toArray()
//             res.send(jobs)
//         })

//         console.log("pigned your deployment. you successfully connected to mongodb!");
//     } finally{
//         await client.close();
//     }
// }
// run().catch(console.dir)
// end of connecting to mongo DB

// start
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://esmatullah1382:fyCEXoGhAUnK7xVx@job-portal-demo.teqzn.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// end

app.get('/',(req,res)=>{
    res.send("Hello Esmatullah");
})

app.listen(port,()=>{
    console.log(`you are listening on port ${port}`);
})