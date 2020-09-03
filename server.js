const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const errorHandlder = require('./middleware/error');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// routes import
const boards = require('./routes/boards');
const threads = require('./routes/threads');
const messages = require('./routes/messages');

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
app.use('/api/v1/threads', threads);
app.use('/api/v1/messages', messages);

app.use(errorHandlder);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server & exit process
  server.close(() => process.exit(1));
})