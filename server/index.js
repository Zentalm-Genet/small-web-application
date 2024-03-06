const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());


const { getCompliment, getFortune, getInspires, createInspire, editInspire, deleteInspire, createGoal, deleteGoal, healthCreate, deleteHealthRecord } = require('./controller')

const baseURL = "/api/inspires";


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);  
app.get(baseURL, getInspires);
app.post(baseURL, createInspire);
app.put(`${baseURL}/:identify`, editInspire);
app.delete(`${baseURL}/:identity`, deleteInspire)
app.post("/api/goals", createGoal)
app.delete(`/api/goals/:goalId`, deleteGoal)
app.post("/api/healths", healthCreate);
app.delete(`/api/healths/:recordId`, deleteHealthRecord);


app.listen(4000, () => console.log("Server running on 4000"));
