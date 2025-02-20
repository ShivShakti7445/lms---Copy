import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRoutes.js'
import { clerkMiddleware } from '@clerk/express'

// Initialize Express
const app = express()
app.use(clerkMiddleware())

// Connect to database
await connectDB()
// await connectCloudinary()

// Middlewares
app.use(cors())

//route
app.get('/', (req, res) => res.send("API Working"))
app.use('/api/educator', express.json(), educatorRouter)
app.post('/clerk', express.json() , clerkWebhooks)
// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

