import A from 'a' V.S. import * as A from 'a'

#import A from 'a'
It will import the default in a.js, so if export default doesn't present, it will be undefined. If a.js export default a function, A() will work.

#import * as A from 'a'
It will import every export in a.js, so if export default does present, it will be A.default. If a.js export default a function, A() will cause error because A is a namespace which is not callable.

To see more details check codes and comments in index.js and run it `npm start` to see actually results.