export default function errorHandler(error, req, res, status = 500) {
  return res.status(status).send({
    success: false,
    error: error,
  });
}
