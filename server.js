import express from "express";
import notesRoutes from './routes/notesRoutes.js'
import {connectDB}  from './config/db.js';
import dotenv from "dotenv";
import cors from "cors"



const app = express();
const port = process.env.PORT || 5001
dotenv.config();
app.use(express.json());
app.use(
    cors({
    origin:"https://mernstackactivityfrontend.onrender.com",
})
);
// app.use(rateLimiter);

app.use("/api/notes",notesRoutes);
app.use((req,res,next)=>{
    console.log("we get new request");
    next();

})
console.log(process.env.MONGO_URI)

connectDB().then(()=>{
    app.listen(port,()=>{
    console.log("Server is running")

});

})


// app.get("/",(req,res)=>{
// res.send("Hello this is sumalathaAkhilss");
// });

// app.post("/",(req,res)=>{
// res.send("Hello this is sumalathaAkhilss");
// });


