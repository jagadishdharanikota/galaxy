const fs = require('fs');
const paths = require('../../config/paths');
const pluginName = 'AssetsPublisherPlugin';

class AssetsPublisherPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      // console.log('The webpack build process is starting!');
    });

    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      // const outputBundlePaths = Object.keys(compilation.assets);
      // console.log(outputBundlePaths);
      // output to dist/files.json
      // saveToOutputDir('files.json', outputBundlePaths);
    });

    compiler.hooks.done.tap(pluginName, (stats) => {
      // your finalize build step
      // console.log(stats.compilation.chunks.map(c => c.files))
      // console.log(Object.keys(stats.compilation.assets));
      const { entrypoints } = stats.compilation;
      const keyIterator = entrypoints.keys();
      const entry = entrypoints.get(keyIterator.next().value);
      const { chunks } = entry;
      const entryChunks = {};
      chunks.forEach((value, key, map) => {
        const { name, files } = value;
        entryChunks[name] = files;
      });

      fs.writeFile(
        `${this.options.path}/${this.options.fileName || 'entry-chunks'}.json`,
        JSON.stringify(entryChunks),
        (err) => {
          if (err) {
            console.error(`Failed to create ${this.options.fileName} chunks entry file.`, err);
            return;
          }
          console.log(`Successfully created chunks entry file (${this.options.fileName}).`);
        }
      );
    });
  }
}

module.exports = AssetsPublisherPlugin;
