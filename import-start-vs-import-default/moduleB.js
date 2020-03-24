export function b1() {
  return 'b1';
}

export function b2() {
  return 'b2';
}

// if export default present, then import B from './moduleB' will work
// also import * as B from 'moduleB' will work
export default { b1, b2 };