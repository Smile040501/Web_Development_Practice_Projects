/*

### Resources:
> https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#perform-output-escaping
> https://github.com/lirantal/awesome-nodejs-security

### Application Security

> Use flat Promise chains

> Set Request Size Limits

> Do not block the event loop

> Perform input validation (`validator`, `express-validator`, `express-mongo-sanitize`)

> Perform output escaping (`escape-html` & `node-esapi`) of all HTML & JS for content shown to user

> Perform application activity logging

> Monitor the event loop

> Prevent Brute-forcing (`rate-limiter` & `express-rate-limit`)

> Use Anti-CSRF tokens

> Remove unnecessary routes

> Prevent HTTP Parameter Pollution (`hpp`)

> Only return what is necessary

> Use object property descriptors

> Use access control lists (`acl`)

### Error & Exception Handling

> Handle uncaughtException

> Listen to errors when using EventEmitter

> Handle errors in asynchronous calls

### Platform Security

> Keep your packages up-to-date (`npm audit`, `npm audit fix`)

> Do not use dangerous functions (eval() / child_process.exec)

> Stay away from evil regexes (`vuln-regex-detector`)

> Run security linters

> Use strict mode

> Adhere to general application security principles

### Server Security

> Set cookie flags appropriately

> Appropriate Security Headers
    > Helmet
    > X-XSS-Protection: helmet.xssFilter()
    > Cache Control: helmet.noCache()
    > Expect-CT: (`expect-ct` package, helmet.expectCt())
    > Public-Key-Pins: helmet.hpkp() (Deprecated)

  
*/
