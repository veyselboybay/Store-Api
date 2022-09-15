require('dotenv').config();

//async errors
require('express-async-errors')


const express = require('express')
const app = express();

const connectDB = require('./db/connect');
const router = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json())
//routes
app.get('/',(req,res) => {
    res.send('<h1>Store Api</h1><a href="/api/v1/products">All Products</a>');
});

//products route

app.use('/api/v1/products',router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//listen server
const port = process.env.PORT || 3000;


const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();


