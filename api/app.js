const express = require('express');
const morgan = require('morgan');

const app = express();

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const lessonRouter = require('./routes/lessonRoutes');

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Routes
app.use('/api/v1/lessons', lessonRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`There is no route for ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
