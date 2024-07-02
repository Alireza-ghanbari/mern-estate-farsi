import express from "express"
import morgan from "morgan"

import authRouter from "./routes/auth.route.js"

const app = express()

app.use(morgan("dev"))
app.use(express.json())

// Routes
// app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)


export default app