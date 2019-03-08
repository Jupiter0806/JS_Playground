https://github.com/github/fetch/issues/137#issuecomment-168014143

```javascript
fetch(new Request(url, { ...fetchOptions, redirect: 'error' }))
  .then(res => {
    return resolve(res)
  })
  .catch(error => {
    return reject(error)
  })
```