# Newshore automation tests E2E

Follow the next steps to setup the enviroment config:

## 1. Install requirements

make sure yo have node version @16 LTS (Long time support). 
[download here](https://nodejs.org/es/download/)

**Important:** Disable VPN to allow npm install

## 2. Install all dependencies npm

`npm install`

## 3. Run project on Windows OS

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

## Git Config

1. on git bash use `git branch --unset-upstream` to sync online


