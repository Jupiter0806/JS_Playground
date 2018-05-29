const { generateFun } = require('./helper')

const ERROR_STATUS = {
    UNKNOWN_ERROR: 0
}

// will foo run correctly?
const foo = generateFun(error => console.log('error displayed in callback', {error}))
foo("new error")

function generateError(errorcode) {
    return {
        Status: errorcode,
        Message: "ErrorCode: " + errorcode
    }
}
