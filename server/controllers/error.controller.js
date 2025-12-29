/**
 * Send verbose error response for development environment.
 * Includes stack and full error object for easier debugging.
 */
const sendErrorDev = (err, res) => {

    return res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message,
        stack: err.stack,
        error: err
    });

}

/**
 * Send minimal error response for production environment.
 */
const sendErrorPro = (err, res) => {
    return res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.status
    });
}

/**
 * Express global error handler. Chooses response format based on NODE_ENV.
 */
const globalErrorHandler = (err, req, res, next) => {


    if (process.env.NODE_ENV === "dev") {
        return sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "prod") {
        return sendErrorPro(err, res);
    }

}

/**
 * Export the global error handler middleware.
 */
module.exports = globalErrorHandler