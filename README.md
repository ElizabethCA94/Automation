# Run project on Windows:

remember start VS code with admin privileges

`npx cypress open`

## How Create the environment

1. add the `support\index.js` file with the following code

```js
import './commands'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
```

2. in the file `cypress.config.js` add the following config

```js
module.exports = defineConfig({
  chromeWebSecurity: false,
});
```


