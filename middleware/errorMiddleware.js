const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error! Please try again!';
  res.status(statusCode).json({ message });
};

module.exports = { errorHandler };
