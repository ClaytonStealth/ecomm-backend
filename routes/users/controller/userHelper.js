const errorHandler = async (err) => {
  return {
    status: err.status,
    message: err.message,
  };
};

module.exports = {
  errorHandler,
};
