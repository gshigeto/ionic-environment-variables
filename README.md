# Ionic Environment Variables

With this configuration, you can import environment variables anywhere, even in your `app.module.ts`.
Also supports any number of custom environments (prod, staging, dev, etc.)


Add the following to your `package.json`:
```json
"config": {
  "ionic_optimization": "./config/optimization.config.js",
  "ionic_webpack": "./config/webpack.config.js"
}
```

Add the following to your `tsconfig.json` in `compilerOptions`:
```json
"baseUrl": "./src",
"paths": {
  "@app/env": [
    "environments/environment"
  ]
}
```

Create a file in your base directory `config/optimization.config.js` and paste the following:
```javascript
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/optimization.config.js');

module.exports = function () {
  useDefaultConfig.resolve.alias = {
    "@app/env": path.resolve('./src/environments/environment' + (process.env.IONIC_ENV === 'prod' ? '' : '.' + process.env.IONIC_ENV) + '.ts')
  };

  return useDefaultConfig;
};
```

Create another file in your base directory `config/webpack.config.js` and paste the following:
```javascript
var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

module.exports = function () {
  useDefaultConfig.resolve.alias = {
    "@app/env": path.resolve('./src/environments/environment' + (process.env.IONIC_ENV === 'prod' ? '' : '.' + process.env.IONIC_ENV) + '.ts')
  };

  return useDefaultConfig;
};
```

Create a default file `src/environments/environment.ts` which will be used for your **PRODUCTION** environment:
```typescript
export const ENV = {
  mode: 'Production'
}
```

Create a default file `src/environments/environment.dev.ts` which will be used for your development environment:
```typescript
export const ENV = {
  mode: 'Development'
}
```
For any other configuration, just add another file `src/environments/environment.*.ts` which will then be used with build flags. It is that easy!

You can then import your environment variables anywhere!
```typescript
import { ENV } from '@app/env'
```

**NOTE** Remember to ignore your files in your `.gitignore`
```
# Envrionment Variables
**/environment.*
!**/environment.model.ts
```

To test production builds: `npm run ionic:build --prod` then open the www/index.html file in your browser.
# If more than `prod` and `dev` environments are wanted

1. Change your `optimization.config.js` and `webpack.config.js` `IONIC_ENV` variable to be something else. For example:
```javascript
'./src/environments/environment' + (process.env.MY_ENV === 'prod' ? '' : '.' + process.env.MY_ENV) + '.ts'
```
2. Add to your `package.json` another run script and name it whatever you would like
```json
"serve:testing": "MY_ENV=testing ionic-app-scripts serve"
```
3. Create your testing file `src/environments/environment.testing.ts`. This should be whatever you set your `MY_ENV` to.
4. Finally, run the script by using the name you used for your script in `package.json`
```bash
$ npm run serve:testing
```