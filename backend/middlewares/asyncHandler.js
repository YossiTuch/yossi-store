const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(error => {
    const status = error.statusCode || error.status || 500;
    res.status(status).json({ message: error.message });
  });
};

export default asyncHandler;
