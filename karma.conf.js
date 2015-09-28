module.exports = function (config) {
  config.set({

    files: [
      'dist/mediatype-parser-browser.js',
      'src/mediatype-parser.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    reporters: ['progress']
  });
};
