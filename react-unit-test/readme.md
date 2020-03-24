Notes for integrate unit test into an existing react project that is not created using create-react-app.

It uses mocha as tests runner and enzyme.

If error says export is unexpected syntax, add --required esm into the mocha run comman.

... restObjectSpread is not supported
  install @babel/plugin-proposal-object-rest-spread
  add it into babel.config.js module.exports={ "plugins"" ["@babel/plugin-proposal-object-rest-spread"] }
  make sure .babelrc renamed into babel.config.js

Follow this https://www.robinwieruch.de/react-testing-tutorial/

Todo:
  Add a small react project here for demo.