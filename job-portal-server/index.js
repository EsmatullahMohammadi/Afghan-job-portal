const express = require('express');
const app = express();
const cors = require('cors');
const multer = require("multer")
const path = require("path");
const port = process.env.PORT || 3000;

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: ['https://vercel.app/'],
//     methods: ['POST', 'GET', 'DELETE', 'PUT'],
//     credentials: true
// }));
app.use('/public/images',express.static('public/images'))

// Connect to MongoDB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// Store sensitive data in environment variables for security
const uri = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal-demo.teqzn.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-demo`;

app.get('/',(req,res)=>{
    res.json("hello vercel")
})
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
        const storage = multer.diskStorage({
            destination: (req , file , cb)=>{
                cb(null , "public/images")
            },
            filename : (req, file , cb)=>{
                cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
            }
        })
        const upload = multer({
            storage: storage
        })
        app.post('/post-job', upload.single('file'), async (req, res) => {
            try {
                const body = req.body;
                body.createdAt = new Date(); // Correct field name `createdAt`
                body.companyLogo = req.file.filename;
                req.body.skills = JSON.parse(req.body.skills)
                
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
        
        app.patch('/update-job/:id', upload.single('file'), async (req, res) => {
            try {
                const id = req.params.id;
                const jobData = req.body;
                console.log(jobData)
                // Check if a file is uploaded, otherwise keep the old company logo
                if (req.file) {
                    jobData.companyLogo = req.file.filename;
                }
        
                // Fields to update (Make sure not to update fields like _id, etc.)
                const updateDoc = {
                    $set: {
                        jobTitle: jobData.jobTitle,
                        companyName: jobData.companyName,
                        minPrice: jobData.minPrice,
                        maxPrice: jobData.maxPrice,
                        salaryType: jobData.salaryType,
                        jobLocation: jobData.jobLocation,
                        postingDate: jobData.postingDate,
                        experienceLevel: jobData.experienceLevel,
                        employmentType: jobData.employmentType,
                        description: jobData.description,
                        posteBy: jobData.posteBy,
                        skills: JSON.parse(jobData.skills), // Assuming skills is a JSON string
                    }
                };
        
                // If companyLogo exists, update it, otherwise, leave it untouched
                if (jobData.companyLogo) {
                    updateDoc.$set.companyLogo = jobData.companyLogo;
                }
        
                const filter = { _id: new ObjectId(id) };
                const result = await jobsCollection.updateOne(filter, updateDoc);
        
                if (result.modifiedCount > 0) {
                    return res.status(200).send({
                        message: "Job updated successfully!",
                        status: true,
                        result: result
                    });
                } else {
                    return res.status(404).send({
                        message: "Job not found or no changes made.",
                        status: false
                    });
                }
            } catch (error) {
                console.error("Error updating job:", error.message);
                return res.status(500).send({
                    message: "Server error. Please try again later.",
                    status: false,
                    error: error.message
                });
            }
        });
        
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
