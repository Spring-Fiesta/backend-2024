import express from 'express';
import mongoose from "mongoose";
import db from "./db/db.js";
import bodyParser from "body-parser";


const app = express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

import candidateRoute from "./routes/candidateRoute.js";
app.use("/candidate",candidateRoute);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


