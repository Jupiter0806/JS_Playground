To initialise babel to run react code in node js (more specific, server side rendering react), these codes need to be added at the very beginning.

```javascript
require('@babel/register')({ 
  presets: ['@babel/preset-env', "@babel/preset-react"], 
  plugins: ["@babel/plugin-proposal-object-rest-spread"]
});
```

This is to transfer the codes to what node js can understand.

But the question is where this file that contains this code should be located.

The answer is the root directory.

See these project structures.

``` A
App
|--src
|   |-- component_a.js
|
|--ssr
|   |-- component_b.js
|
|--index_ssr.js // contains the codes
```

``` B
App
|--src
|   |-- component_a.js
|
|--ssr
    |--index.js // contains the codes
    |-- component_b.js
```

In the A, component_a and component_b is accessible to the index_ssr, whereas, in the B, only component_b is accessible, not component_a.

This is because, in A, the @babel/register considers component_a and component_b are in the system, so it will take care of them, in other words, transfer them into common js. But in B, the @babel/register considers component_a is outside this system, so it expects component_a is already common js, but it's not, so an error will be rose saying import React (React is Unexpected identifier);

#Todo
[] Add a small project to demo this.