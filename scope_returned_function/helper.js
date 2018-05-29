module.exports = {
    generateFun
}

function generateFun(callback) {
    // callback passed by @param callback
    // but generateError and ERROR_STATUS are defined in another file
    return error => {if (error) callback(generateError(ERROR_STATUS.UNKNOWN_ERROR, error))}
}