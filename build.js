import esbuild from 'esbuild';
import fs from 'node:fs';

// Plugin to add .js extensions to relative imports
const addExtensionsPlugin = {
  name: 'add-extensions',
  setup(build) {
    build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
      let contents = await fs.promises.readFile(args.path, 'utf8');
      // Replace relative imports that don't have an extension with .js
      contents = contents.replaceAll(
        /from\s+['"](\.\.[^'"]*|\.\/[^'"]*?)(?<!\.js|\.ts|\.json|\.mjs|\.cjs)['"];/g,
        "from '$1.js';"
      );
      return { contents, loader: 'ts' };
    });
  },
};

await esbuild.build({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  bundle: true,
  splitting: false,
  external: ['@apollo/server', 'graphql'],
  plugins: [addExtensionsPlugin],
});

console.log('Build complete!');
