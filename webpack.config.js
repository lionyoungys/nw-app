const buildPath = __dirname + '/src/';

const config = {
    mode: 'development',
    devtool: 'eval-source-map',    //生成Source Maps,这里选择eval-source-map
    entry: {
      app: buildPath + 'App.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/app'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env','react']
              }
            }
          },
          {
            test: /\.css$/,
            use: [
              {loader: "style-loader"},
              {loader: "css-loader",options: { url: false, minimize: true }}
            ]
          }
        ]
      }
};

module.exports = config;