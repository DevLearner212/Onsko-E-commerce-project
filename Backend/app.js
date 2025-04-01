import express from 'express';
import dbconnection from './db/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieparser from 'cookie-parser';
import userRouter from './routers/onsko.routers.js';

const app = express();

// Ensure dotenv is configured correctly
dotenv.config();

// Database connection
dbconnection();

// Resolve __dirname in ES modules
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieparser());
const corsOptions = {
  origin: 'http://localhost:5173', // Allow your frontend's URL
  
  credentials: true, // Allow cookies to be sent with requests
   
};

app.use(cors(corsOptions));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));

// API routes
app.use("/api/v1/onsko", userRouter);

// Uncomment this if you want to serve index.html for all other routes
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, 'Frontend', 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
