Where, in a react (or ES6) source code, can access variables that were imported from node_modules. It seams that it is not everywhere of this file.

Check these codes.

```javascript
import moment from 'moment'

const foo = () => {
    var now = moment(); // will get a moment object of current time
}
```

```javascript
import moment from 'moment'

var now = moment(); // will get a moment object of current time

const foo = () => {
}
```

```javascript
import moment from 'moment'


const foo = () => {
    return () => {
        var now = moment(); // moment will be undefined
    }
}
```

```javascript
import moment from 'moment'


const foo = () => {
    var now = moment();
    return () => {
        var next = now + 1; // now is accessble
    }
}
```

Why imported moment cannot be accessed in a returned array function?

One guess is that, the function returned by foo will be ran in another file (or env) which has different scope and has no declaration of moment, so moment will be undefined. But, my understanding is that array function will inherit the this where it defined, that is why in a project that is created by create-react-app, array function defined in a class does not need to bind this before it is passed as a prop to another component. So, have no idea now.

Another question, why variables that declared within the function, which is about to return an array fucntion, can be accessed in the return array function?

Combine previous guess, the returned array function has bind the this of the function where the array function is defined, and moment is not defined in that function's this. That's why only variables defined in the function can be accessed in the return array function.

This guess should be correct. But the question is the outter function is also an array function, which means it should bind the this where it is defined and this 'this' should be passed to its defined array function.

Check this.

```javascript
import moment from 'moment'

this.moment // this is not defined

const foo = () => {
    var now = moment(); // moment will be undefined

    this.moment // this is not defined

    return () => {
        var next = now + 1; // now is accessble
    }
}
```

All this is not defined.....

----- Really don't know .......