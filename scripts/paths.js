const path = require('path')
const root = path.resolve(__dirname, '..')
const resolveWithRoot = relative => path.resolve(root, relative)
const packagesPath = resolveWithRoot('packages')

const getProjectPath = projectName => path.join(packagesPath, projectName)
const getPathsForProject = projectName => {
	const projectPath = getProjectPath(projectName)
	const resolveInProject = relative => path.resolve(projectPath, relative)
	return {
		build: resolveInProject('build'),
		clientEntry: resolveInProject('src/index.js'),
		src: resolveWithRoot('src'),
		template: resolveInProject('src/index.html')
	}
}

module.exports = getPathsForProject
