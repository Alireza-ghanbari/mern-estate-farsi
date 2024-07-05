import express from "express"
import morgan from "morgan"

import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Interna; Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        error: message
    })
})


export default app