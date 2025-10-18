import esbuild, { BuildOptions } from 'esbuild';
import { cpSync } from 'fs';

const isWatch = process.argv.includes('--watch');

const buildOptions: BuildOptions = {
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'dist/bundle.js',
    loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.ts': 'tsx',
        '.tsx': 'tsx',
    },
    define: {
        'process.env.NODE_ENV': '"development"',
    },
    sourcemap: true,
    minify: false,
};

cpSync('resources/index.html', 'dist/index.html', { recursive: true });

if (isWatch) {
    esbuild
        .context(buildOptions)
        .then(context => {
            context.watch();
            console.log('Watching for changes...');
        })
        .catch(() => process.exit(1));
} else {
    esbuild.build(buildOptions).catch(() => process.exit(1));
}
