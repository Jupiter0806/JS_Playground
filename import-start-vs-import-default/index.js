import A from './moduleA';
import * as A_star from './moduleA';
import { a1 } from './moduleA';

import B from './moduleB';
import * as B_star from './moduleB';
import { b1 } from './moduleB';

import C from './moduleC';
import * as C_star from './moduleC';

// output undefined
console.log(A);

// output a1
console.log(A_star.a1());
console.log(a1());

// output b1
console.log(B.b1());
console.log(B_star.b1());
console.log(B_star.default.b1());
console.log(b1());

// output c
console.log(C());

// will cause error
// this is because C_star is defined as a namespace which is not callable
console.log(C_star());