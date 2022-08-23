const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const connectDB = require('./config/mongodb');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5001;

connectDB();

const app = express();

// parse body application/json
app.use(bodyParser.json());

// cors
app.use(cors({ origin: process.env.ORIGIN_URL }));

// routes
app.use('/api/reviews', require('./routes/reviewRoute'));
app.use('/api/users', require('./routes/userRoute'));

// error handling
app.use(errorHandler);

// run server
app.listen(port, () => console.log(`Server runs on port ${port}`));
