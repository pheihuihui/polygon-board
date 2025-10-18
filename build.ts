import esbuild, { BuildOptions } from 'esbuild';
import fs from 'fs';
import sass from 'sass';

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

fs.cpSync('resources/index.html', 'dist/index.html', { recursive: true });
fs.cpSync('resources/favicon.ico', 'dist/favicon.ico', { recursive: true });
const cssres = sass.compile('src/style/global.scss');
fs.writeFileSync('dist/index.css', cssres.css);
esbuild.buildSync(buildOptions);
