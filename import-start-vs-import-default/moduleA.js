export function a1() {
  return 'a1';
}

export function a2() {
  return 'a2'
}

// no export default present, so import A from 'moduleA' won't work
// but import * as A from 'moduleA' will work