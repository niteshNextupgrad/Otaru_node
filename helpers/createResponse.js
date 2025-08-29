const createResponse = (res, success = true, message = '', data = []) => {
    res.json({
        success,
        message,
        data,
        // error,
    })
}
export default createResponse;