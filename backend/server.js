const express = require("express")
const cors = require("cors")
const colors = require("colors")
const morgan = require("morgan")
const dotenv = require('dotenv')
const connectDb = require("./config/db")

// dot env configuration
dotenv.config()

// DB Connection
connectDb()

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json()) // coverts data into json coming from client
app.use(morgan('dev'))



// URL => http://localhost:8080

app.use('/api/v1/test', require("./routes/testRoute"))
app.use('/api/v1/auth', require("./routes/authRoute"))
app.use('/api/v1/user', require("./routes/userRoute"))
app.use('/api/v1/restaurant', require("./routes/restaurantRoute"))
app.use('/api/v1/category', require("./routes/categoryRoute"))
app.use('/api/v1/food', require("./routes/foodRoute"))
app.use('/api/v1/order', require("./routes/recentOrderRoute"))

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to food store server</h1>")
})

// set port
const PORT = process.env.PORT || 5000;

// listen on port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`.white.bgMagenta);
})