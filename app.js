const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connect");
const cors = require("cors");

app.use(
    cors({
        origin: true,
        credentials: true,
        exposedHeaders: ["Set-Cookie"],
    })
);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

const authRouter = require("./routes/authRoutes");
const projectRouter = require("./routes/projectRoutes");
const userRouter = require("./routes/userRoutes");
const ticketRouter = require("./routes/ticketRoutes");
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tickets", ticketRouter);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
