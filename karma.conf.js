module.exports = function (config) {
  config.set({

    files: [
      'src/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    reporters: ['progress']
  });
};
