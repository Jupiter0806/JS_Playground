# Description
In order to loading script dynamically and parallelly, use js code to load other js files, instead of pending it the html file as this way block the page from interacting with users.

alert will show in this order
1. script
2. Message from file1.js
3. Script loaded!
4. load

This is becuase the dynamic script loading will not block others, it will be load parallelly. 