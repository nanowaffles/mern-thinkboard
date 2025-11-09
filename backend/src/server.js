// works with type module
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js"

import cors from "cors"

dotenv.config();

// works with type commonjs
//const express = require("express");

const app = express();

//() allows every single request from every single URL
app.use(cors({
    origin: "http://localhost:5173"
}));
const PORT = process.env.PORT || 5001;


// middleware
app.use(express.json());// this middleware will parse JSON bodies: req.body
// our simple custom middleware below
// typically use middleware to do authentication.

// add some more middleware
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
    next();
});

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT: ", PORT);
    });
});



// mongodb+srv://ccontr94_db_user:TCw6FDam2O9YUP7q@cluster0.q1ag6nb.mongodb.net/?appName=Cluster0