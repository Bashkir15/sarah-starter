process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const args = require('minimist')(process.argv.slice(2))
const { emptyDir } = require('fs-extra')
const getPaths = require('./paths')
const webpackConfig = require('./webpack/config')

const env = { dev: false, prod: true }

function clean(paths) {
	return emptyDir(paths.build)
}

function handleBuild(compiler) {
	return new Promise((resolve, reject) => {
		compiler.run((err, stats) => {
			let messages
			if (err) {
				if (!err.message) {
					return reject(err)
				}
				messages = formatWebpackMessages({
					errors: [err.message],
					warnings: []
				})
			} else {
				messages = formatWebpackMessages(stats.toJson({ all: false, errors: true, warnings: true }))
			}

			if (messages.errors.length) {
				if (messages.errors.length > 1) {
					messages.errors.length = 1
				}
				return reject(new Error(messages.errors.join('\n\n')))
			}

			return resolve({
				stats,
				warnings: messages.warnings
			})
		})
	})
}

function handleLog({ stats, warnings }) {
	if (warnings.length) {
		console.warn('compiled with warnings')
		console.log(warnings.join('\n\n'))
	} else {
		console.log('Compiled successfully!')
	}
}

async function buildBundle(paths) {
	const config = webpackConfig(env, paths)
	const compiler = webpack(config)
	console.log('Building bundle...')
	const results = await handleBuild(compiler)
	handleLog(results)
}

async function runBuild() {
	const { project } = args
	if (!project) {
		throw new Error('You need to pass a project name to build')
	}

	const paths = getPaths(project)
	try {
		await clean(paths)
		await buildBundle(paths)
	} catch (err) {
		console.error('build failed')
		console.log(err)
		process.exit(1)
	}
}

runBuild()
	.then(() => {
		console.log('Build completed successfully')
	})
	.catch(err => {
		if (err && err.message) {
			console.log(err.message)
		}
		process.exit(1)
	})
