const chalk = require('chalk')

const preDeclared = {
    a: 'a',
    b: 'b'
}
const callbackObject = {
    c: 'c', 
    d: 'd'
}

console.log("Pre-declared object is", chalk.bgCyan(JSON.stringify(preDeclared)))
console.log("Callback object is", chalk.bgCyan(JSON.stringify(callbackObject)))

/* 
    expect callbackObject's value is 
    {
        c: 'c', 
        d: 'd'
    }
    but it is actually 
    {
        a: 'a',
        b: 'b'
    }
*/
foo(preDeclared, callbackObject => {
    console.log("In callback block, callbackObject is", chalk.bgGreen(JSON.stringify(callbackObject)))
})

function foo(object, callback) {
    callback(preDeclared)
} 