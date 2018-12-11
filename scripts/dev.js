process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const args = require('minimist')(process.argv.slice(2))
const generatePaths = require('./paths')
const webpackConfig = require('./webpack/config')
const env = { dev: true, prod: false }

const buildConfig = () => {
	const { project } = args
	if (!project) {
		throw new Error('You need to pass a project name to run a build')
	}

	const paths = generatePaths(project)
	const config = webpackConfig(env, paths)
	return config
}

const config = buildConfig()
module.exports = config

