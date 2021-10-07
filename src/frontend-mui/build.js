const { exec } = require('child_process');

const watch = process.argv[2] === '--watch';

// Copy over necessary CSS & fonts directories
[
  './compile_protos.sh',
  'mkdir -p public/client',
  'rsync -a node_modules/typeface-roboto/ public/client/typeface-roboto/',
  'rsync -a assets/globals.css public/client/globals.css',
].forEach((command) => {
  console.log(command);
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.log(`error: ${err.message}`);
      throw err;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      throw stderr;
    }
    console.log(stdout);
  });
});

if (watch) {
  console.log('Watching files ...');
} else {
  console.log('Building bundles ...');
}

require('esbuild').build({
  entryPoints: ['assets/index.tsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outdir: './public/client/',
  watch: watch,
  plugins: []
}).catch(() => process.exit(1))
