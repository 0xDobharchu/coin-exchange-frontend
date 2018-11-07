module.exports = ({ ctx, env }) => {
  const isProduction = env === 'production';
  return ({
    plugins: {
      precss: isProduction ? {} : false,
      autoprefixer: isProduction ? {
        ...ctx ? ctx.options.autoprefixer : {},
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',
        ],
      } : false,
    },
  });
};
