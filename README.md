# webpack2-ts-template
Template for building apps with WebPack 2 and TypeScript

## Notes
- `npm view webpack dist-tags` => see version tags for webpack (or any other package)
- It's 2017, and UglifyJS does not support ES6
- Consider simplifying production build with webpack -p
	- See https://webpack.js.org/guides/production-build/
	- See http://stackoverflow.com/a/39813511/2342681

## ToDo
- Tree shaking => check if already working after enabling uglify
	- Notice: will not work for external modules using commonjs require(...)
- Access config options in runtime (e.g. DEV/PROD environment)

## Done
- TypeScript support
- Source maps
- Dev server
- Uglify
	- Only for production environment, without source maps
	- Source maps could be enabled for production with `{ sourceMap: true }`
		as plugin parameter.
- Environments: DEV / PROD
- Importing from external lib without packaging (e.g. Ramda)
