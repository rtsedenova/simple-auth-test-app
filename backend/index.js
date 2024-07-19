const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 3000 || process.env.PORT;

const uri = process.env.MONGODB_URI || "mongodb+srv://recedenova:doki0606@testcluster.chb0egv.mongodb.net/?appName=TestCluster";
const client = new MongoClient(uri, {
  tls: true,
  ssl: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());
app.use(bodyParser.json());

async function run() {
  try {
    await client.connect();
    const database = client.db('test_database'); 
    await database.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
    const employees = database.collection('employees');

    // Get employees
    app.get('/employees', async (req, res) => {
      try {
        const allEmployees = await employees.find({}).toArray();
        res.json(allEmployees);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // Get single exact employee
    app.get('/employees/:id', async (req, res) => {
      try {
        const employeeId = req.params.id;
        console.log(employeeId)
        const employee = await employees.findOne({ _id: new ObjectId(employeeId) });
        if (!employee) {
          res.status(404).send('Employee not found');
        } else {
          res.json(employee);
        }
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // Add employees
    app.post('/employees', async (req, res) => {
      try {
        const newEmployees = req.body;
        const result = await employees.insertMany(newEmployees);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    // Delete employees
    app.delete('/employees', async (req, res) => {
      try {
        const result = await employees.deleteMany({});
        res.json(result);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);
