# webpack2-ts-template
Template for building apps with WebPack 2 and TypeScript

## Installation
1. Clone this repository.
1. Rename its directory to your project's name.
1. Remove the .git directory and then run `git init`.
1. Modify package.json, changing at least the `name`, `author` and `description` properties.
1. Run `npm install`.
1. You are ready to go.

## Usage
- Production build: `npm run build`
- Development server with watch mode and automatic reload: `npm run dev`

## Notes
- `npm view webpack dist-tags` => see version tags for webpack (or any other package)
- It's 2017, and UglifyJS does not support ES6
- Consider simplifying production build with webpack -p
	- See https://webpack.js.org/guides/production-build/
	- See http://stackoverflow.com/a/39813511/2342681

## Configuration
The following sections provide a description of each relevant line of the configuration.

### tsconfig.json
This is the full code:
```json
{
	"compilerOptions": {
		"target": "ES5",
		"module": "es6",
		"sourceMap": true,
		"outDir": "js",
		"types": [],
		"lib": ["dom", "es6", "dom.iterable"],
		"strictNullChecks": true,
		"moduleResolution": "node"
	},
	"include": [
		"src/**/*"
	]
}
```
The properties relevant to our build process are:
- `target`: The TypeScript compiler transpiles from TypeScript to JavaScript. This parameter specifies which version of JavaScript to use for the generated code. We are in 2017 (or later, depending when you read this), and practically all browsers support ES6. However, if we want to minify our code for production, the UglifyJS plugin will be used, and it is currently not capable of minifying ES6 code. So unfortunately we must downgrade the generated code to ES5 by providing the `ES5` value.
- `module`: If the `commonjs` value is used, then the `import`s in the TypeScript code  will be translated to `require(...)`. This used to be the standard approach for bundlers, but for WebPack 2 to support tree-shaking (in combination with the UglifyJS plugin), ES6 modules must be used; so we provide the `es6` value to tell TypeScript to leave imports and exports in ES6 mode.
- `sorceMap`: We will definitely need to debug our code in the browser, so we set this property to `true`.
- `lib`: When setting `target` to `ES6`, TypeScript applies sensible defaults for the runtime libraries. But when setting it to `ES5`, we must explicitly tell TypeScript that the ES6 runtime will be available in our runtime environment.
- `moduleResolution`: TypeScript should already default this value to `node` but for some reason it is not doing it correctly. The `node` module resolution strategy ensures that external modules are looked up in the `node_modules` folder -- otherwise, only the local path is searched and you may get "Cannot find module ..." errors.

### webpack.config.js
- `devtool`: We set this property to `source-map` in order to enable source maps.
- `entry`: In our example we illustrate building multiple bundles. That may be necessary for large applications, or even for small SPAs if they use Web Workers, which must be defined in a separate file. The name of each property of the `entry` object corresponds with the `[name]` variable of the `output` section.
- `output`: Used to specify the path and file name of the output bundle. If more than one entry is used, the `[name]` variable can be used to generate a different bundle for each entry.
- `resolve`: By default, WebPack will only look in `.js` files to find module dependencies. Since we are using TypeScript, we must add the `.ts` extension to the list.
- `module.loaders`: Here we specify that we want our TypeScript code to be processed by the `ts-loader` module loader, which will transpile our TypeScript code to JavaScript according to the settings specified in `tsconfig.json`.
- `externals`: If we are loading some external library such as **jQuery** or **Ramda** from our `index.html` page, then we want to be able to use it from our code but without bundling the library in our output bundles. So here we specifiy one entry for each external library of such type. The property name must match with the `library` name specified at `import { whatever } from 'library'`.

### package.json
Here are the relevant parts of package.json:
```json
{
	"scripts": {
		"build": "webpack --env.target=PROD",
		"dev": "webpack-dev-server --env.target=DEV --content-base web/"
	},
	"devDependencies": {
		"ts-loader": "^1.3.3",
		"typescript": "^2.1.5",
		"webpack": "^2.2.0",
		"webpack-dev-server": "^2.2.0"
	},
}
```
- Scripts:
	- `build` script: calls WebPack passing an environment value named `target` with its value set to `PROD`. The `target` parameter is then queried in the webpack.config.js script, in order to setup the build parameters according to its value; in particular, the UglifyJS plugin is activated in order to minify the output. A simpler way to setup a production build is by passing the `-p` parameter, i.e., simply `webpack -p`. That automatically sets up the UglifyJS plugin and other environment parameters.
	- `dev` script: calls webpack-dev-server, which sets up the following:
		- A continuous watch mode that watches for changes in source files and automatically rebuilds the code.
		- A development server that serves the content inside the `web/` folder, and automatically reloads the page whenever any output file is updated.
- Dependencies:
	- TypeScript dependencies: the `typescript` compiler itself, and the WebPack `ts-loader`.
	- WebPack 2 dependencies: the builder and the development server.
