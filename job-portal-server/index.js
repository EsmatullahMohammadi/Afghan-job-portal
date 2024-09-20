const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Store sensitive data in environment variables for security
// const uri = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.teqzn.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;
const uri = "mongodb://localhost:27017/"
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connecting to the MongoDB server
        await client.connect();
        console.log("Successfully connected to MongoDB!");

        const db = client.db("mernPortalJob");
        const jobsCollection = db.collection("demoJobs");

        // Post a job
        app.post('/post-job', async (req, res) => {
            try {
                const body = req.body;
                body.createdAt = new Date(); // Correct field name `createdAt`
                
                const result = await jobsCollection.insertOne(body);
        
                if (result.insertedId) {
                    return res.status(200).send(result); // Successfully inserted
                } else {
                    return res.status(500).send({
                        message: "Unable to insert! Try again later.",
                        status: false
                    });
                }
            } catch (error) {
                // Log the error and send a response
                console.log(error);
                return res.status(500).send({
                    message: "Server error. Please try again later.",
                    status: false,
                    error: error.message // Send error message for debugging
                });
            }
        });

        // Get all jobs
        app.get('/all-jobs', async (req, res) => {
            try {
                const jobs = await jobsCollection.find({}).toArray();
                res.status(200).send(jobs); // Return the jobs with a 200 status code
            } catch (error) {
                console.log(error);
                res.status(500).send({
                    message: "Failed to retrieve jobs",
                    error: error.message
                });
            }
        });

        // get a single job by id
        app.get('/all-jobs/:id' , async(req,res)=>{
            const id=req.params.id;
            const job= await jobsCollection.findOne({
                _id: new ObjectId(id)
            });
            res.send(job)
        })

        // get jobs by email
        app.get('/myJobs/:email', async(req,res)=>{
            const jobs = await jobsCollection.find({posteBy:req.params.email}).toArray();
            res.status(200).send(jobs);
        })

        // delete a job
        app.delete('/job/:id' , async(req,res)=> {
            const id=req.params.id;
            const filter = {_id: new ObjectId(id)};
            const result = await jobsCollection.deleteOne(filter)
            res.send(result)
        })

        // Update a job
        app.patch('/update-job/:id', async(req,res)=>{
            const id =req.params.id;
            const jobData=req.body;
            const filter={_id: new ObjectId(id)};
            const options ={upsert: true};
            const updateDoc={
                $set:{
                    ...jobData
                },
            }
            const result= await jobsCollection.updateOne(filter, updateDoc,options);
            res.send(result);
        })

    } catch (error) {
        console.log("Error connecting to MongoDB:", error.message);
    }
}

// Start MongoDB connection and keep it open while the server is running
run().catch(console.dir);

// Root endpoint
app.get('/', (req, res) => {
    res.send("Hello Esmatullah");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
