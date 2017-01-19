# webpack2-ts-template
Template for building apps with WebPack 2 and TypeScript

## Notes
- `npm view webpack dist-tags` => see version tags for webpack (or any other package)
- It's 2017, and UglifyJS does not support ES6

## ToDo
- Tree shaking => check if already working after enabling uglify
- Importing from external lib without packaging (e.g. Ramda)
	- See 'externals' webpack config entry
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
