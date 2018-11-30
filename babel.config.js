
module.exports = {
  'presets' : [
    [
      '@babel/preset-env',
      {
        forceAllTransforms: true
      },
    ],
    '@babel/preset-react',
  ],
  'plugins': [
    ['transform-imports', {
      'react-bootstrap': {
        'transform': 'react-bootstrap/lib/${member}',
        'preventFullImport': true
      },
      'lodash': {
        'transform': 'lodash/${member}',
        'preventFullImport': true
      },
      'react-icons': {
        'transform': 'react-icons/md/${member}',
        'preventFullImport': true
      }
    }],
    '@babel/plugin-syntax-dynamic-import',
    'transform-function-bind',
    ['transform-class-properties', { 'spec': true }],
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-transform-runtime', {
      'regenerator': true
    }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-react-jsx',
    'emotion'
  ]
};
