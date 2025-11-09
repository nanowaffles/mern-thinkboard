// works with type module
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js"
import path from "path";

import cors from "cors"

dotenv.config();

// works with type commonjs
//const express = require("express");

const app = express();
const PORT = process.env.PORT || 5001;
// gives src path of the backend
const __dirname = path.resolve();

//() allows every single request from every single URL
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
    origin: "http://localhost:5173"
}));
}




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

if (process.env.NODE_ENV === "production") {
    // serve our optimized react application
    // serve as a static asset
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // get request other than route above then we
    // we'd like to serve our react application
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started on PORT: ", PORT);
    });
});



// mongodb+srv://ccontr94_db_user:TCw6FDam2O9YUP7q@cluster0.q1ag6nb.mongodb.net/?appName=Cluster0