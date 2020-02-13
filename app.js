const express = require('express');
const morgan = require('morgan');

const eventRouter = require('./routes/eventRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE 
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//3) ROUTES
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;