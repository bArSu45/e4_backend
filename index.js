const express = require("express");

const { connection } = require("./config/db");

const { todoRouter } = require("./Routes/todo.routes");

const { userRouter } = require("./Routes/User.routes");

const { authentication } = require("./middleware/authentication");

require(`dotenv`).config();


const app = express();
app.use(express.json());

app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("Welcome to Homepage")
})

app.use(`/user`, userRouter)

app.use(authentication)

app.use(`/todo`, todoRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected sucess");
    }
    catch (e) {
        console.log(e);
    }
    console.log(`listening to port http://localhost:${process.env.port}`)
})