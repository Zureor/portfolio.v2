module.exports = {
  plugins: {
    // Makes the @custom-media definitions in media.css visible to every CSS module
    '@csstools/postcss-global-data': {
      files: ['src/layouts/App/media.css'],
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
  },
};
