import express from "express"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import testRoute from "./routes/test.route.js"
import { verifyToken } from "./middleware/verifyToken.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/posts.route.js"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST' , 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials : true,
}));


app.use("/api/auth",authRoute)

app.use("/api/post",postRoute)

app.use("/api/test",verifyToken, testRoute)
app.use("/api/users", userRoute); 

app.listen(3000,()=>{
    console.log("server running on port 3000");
})