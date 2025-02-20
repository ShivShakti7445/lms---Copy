import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

// Initialize Express
const app = express()

// // Connect to database
// await connectDB()
// // await connectCloudinary()

// // Middlewares
// app.use(cors())

// //route
// app.get('/', (req, res) => res.send("API Working"))
// app.post('/clerk', express.json() , clerkWebhooks)
// // Port
// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// })

// Start server function
const startServer = async () => {
    try {
        // Connect to database
        await connectDB()
        
        // Middlewares
        app.use(cors())
        app.use(express.json())
        
        //routes
        app.get('/', (req, res) => res.send("API Working"))
        app.post('/clerk', clerkWebhooks)
        
        // Port
        const PORT = process.env.PORT || 5000
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.error('Server error:', error);
        process.exit(1);
    }
}

// Start the server
startServer();