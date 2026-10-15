const fs = require('fs')
const path = require('path')
const {
    createInstrumenter,
} = require('istanbul-lib-instrument')

const istanbulCoveragePlugin = {
    name: 'istanbul-coverage',

    setup(build) {
        build.onLoad(
            {
                filter: /\.(js|jsx)$/,
            },

            async (args) => {
                const normalizedPath =
                    args.path.replace(/\\/g, '/')

                // Solo medimos nuestro código fuente.
                // No instrumentamos test ni node_modules.
                if (!normalizedPath.includes('/src/')) {
                    return null
                }

                const source = await fs.promises.readFile(
                    args.path,
                    'utf8',
                )

                const instrumenter = createInstrumenter({
                    esModules: true,
                    produceSourceMap: true,
                    compact: false,
                    parserPlugins: ['jsx'],
                })

                const instrumentedCode =
                    instrumenter.instrumentSync(
                        source,
                        args.path,
                    )

                const extension =
                    path.extname(args.path).toLowerCase()

                return {
                    contents: instrumentedCode,

                    loader:
                        extension === '.jsx'
                            ? 'jsx'
                            : 'js',

                    resolveDir: path.dirname(args.path),
                }
            },
        )
    },
}

module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            {
                pattern: 'test/**/*.spec.js',
                watched: false,
            },
        ],

        preprocessors: {
            'test/**/*.spec.js': ['esbuild'],
        },

        esbuild: {
            bundle: true,

            sourcemap: 'inline',

            target: 'chrome100',

            jsx: 'automatic',

            plugins: [
                istanbulCoveragePlugin,
            ],
        },

        reporters: [
            'progress',
            'coverage',
        ],

        coverageReporter: {
            dir: 'coverage',

            reporters: [
                {
                    type: 'text-summary',
                },

                {
                    type: 'html',
                    subdir: 'html',
                },

                {
                    type: 'json-summary',
                    subdir: '.',
                    file: 'coverage-summary.json',
                },
            ],
        },

        browsers: ['ChromeHeadless'],

        singleRun: true,

        autoWatch: false,

        client: {
            clearContext: false,
        },
    })
}