const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// routes import
const boards = require('./routes/boards');

// load env variables
dotenv.config({ path: './config/config.env' });

// connect to db
connectDB();

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// logging middleware. only in dev mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// sanitize data
app.use(mongoSanitize());

// setup public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});


app.use('/api/v1/boards', boards);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));