## Ionic Environment Variables

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
    "@app/env": path.resolve('./src/environments/environment' + (process.env.IONIC_ENV === 'dev' ? '' : '.' + process.env.IONIC_ENV) + '.ts')
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
    "@app/env": path.resolve('./src/environments/environment' + (process.env.IONIC_ENV === 'dev' ? '' : '.' + process.env.IONIC_ENV) + '.ts')
  };

  return useDefaultConfig;
};
```

Create a default file `src/environments/environment.ts` which will be used for your development environment:
```typescript
export const ENV = {
  mode: 'Development'
}
```

Create a default file `src/environments/environment.prod.ts` which will be used for your production environment:
```typescript
export const ENV = {
  mode: 'Production'
}
```
For any other configuration, just add another file `src/environments/environment.*.ts` which will then be used with build flags. It is that easy!

You can then import your environment variables anywhere!
```typescript
import { ENV } from '@app/env'
```

To test production builds: `npm run ionic:build --prod` then open the www/index.html file in your browser.