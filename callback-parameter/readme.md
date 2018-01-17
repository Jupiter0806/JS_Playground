# All wrong
Check index.js output

Check these codes

```javascript
const loginSession = {}
function signIn(callback) {
    Users.signIn("user.ID", "user", loginSession.SourceDeviceID, loginSession.SourceDeviceType, (error, loginSession) => {
        if (!error) {
            console.log(chalk.green("Sign In user passed"), "with login session", loginSession)
            callback(true)
        } else {
            console.log(chalk.red("Sign In user failed due to"), error)
            callback(false)
        }
    })
}
```

loginSession is declared and it has the same name as the parameter of the callback value. So will loginSession be the new value or the pre-declared value?

In the test, it is the pre-declared value.

But about error which is declared via callback parameter, if it again as another callback parameter, will it be the new value or the old value

```javascript
const loginSession = {}
function signIn(callback) {
    Users.signIn("user.ID", "user", loginSession.SourceDeviceID, loginSession.SourceDeviceType, (error, loginSession) => {
        User.foo(loginsession, error => {console.log(error)})
        if (!error) {
            console.log(chalk.green("Sign In user passed"), "with login session", loginSession)
            callback(true)
        } else {
            console.log(chalk.red("Sign In user failed due to"), error)
            callback(false)
        }
    })
}
```

The error should be the new value.

So my guess is if a variable is declared as non-callback-parameter, when it is as a callback parameter, it should be keep it original value, whereas if it is declared as callback parameter, it will accept the new value.

