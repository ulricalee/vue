const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const appPath = {
    template : 'pages', //模板目录
    entryjs : 'app' //对应模板的js目录
}

var App = (function(){
 
    var entry = {}

    var htmls = []

    glob.sync(`./${appPath.entryjs}/*.js`).forEach( filepath => {
        console.log(filepath)
        let key = /([a-zA-Z])+\.js/.exec(filepath)[0].split('.')[0]

        entry[key] = filepath

        htmls.push(
            new HtmlWebpackPlugin({
                chunks:[key],
                template: `./${appPath.template}/${key}.html`,
                filename: `${key}.html`,
            })
        )

    })

    return {
        entry,
        htmls
    }

})()

module.exports = {
    mode:'development',
    entry:App.entry,
    output:{
        filename:'./dist/[name].js',
        // path:path.join(__dirname, wPath.pages)
        //publicPath: "/app",
    },
    resolve:{
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': __dirname,
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
                //loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/, 
                use: ['vue-loader']
            },
            {
                test: /\.(gif|png|jpeg|jpg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[name]-[hash:5].[ext]'
                            // publicPath:'@'
                            // outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        ...App.htmls
    ],
    
    devServer: {    
        port:9000,
        inline:true,
        hot:true,
        // contentBase: path.join(__dirname, appPath.template),

       //clientLogLevel: 'warning',
        //historyApiFallback: {
        // rewrites: [
        //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        // ],
        // },
        //hot: true,
        //contentBase: false, // since we use CopyWebpackPlugin.
        //compress: true,
        //host: HOST || config.dev.host,
        //port: PORT || config.dev.port,
        //open: config.dev.autoOpenBrowser,
        // overlay: config.dev.errorOverlay
        // ? { warnings: false, errors: true }
        // : false,
        //publicPath: '',
        //proxy: config.dev.proxyTable,
       // quiet: true, // necessary for FriendlyErrorsPlugin
        // watchOptions: {
        // poll: config.dev.poll,
        // }
      
    }
}
