var arrayList = []
console.log(Object.prototype.toString.call(arrayList))
console.log(typeof arrayList + " " + typeof {})

// supported by Chrome 5, Firefox 4.0, IE 9, Opera 10.5 and Safari 5
console.log(Array.isArray(arrayList))