const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const firstPlugin = require('./webpackplugin/test.js')


var App = (function(){
 
    var entry = {}

    var htmls = []

    let _entryAppPath = path.join(__dirname, 'app', 'pages', '*')

    glob.sync( _entryAppPath ).forEach( filepath => {

        let _appname = filepath.match(/(?<=pages\/).*/)[0]

        entry[ _appname ] = path.join(filepath, 'main.js')
        htmls.push(
            new HtmlWebpackPlugin({
                chunks:[ _appname ],
                template: path.join(filepath, `${_appname}.html`),
                filename: `${_appname}`, //http访问路径
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
    // entry:{
    //     index:'./app/pages/index/main.js',
    //     // a: './a.js'
    // },
    entry:App.entry,
    output:{
        filename:'./dist/[name].js',
        // chunkFilename: "[name].min.js"
        // chunkFilename:'./dist/[name].chunk.js'
    },
    resolve:{
        extensions: ['.js', '.json', '.vue'],
        alias: {
            '@': __dirname,
            '@app':path.resolve('app'),
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
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            "babelrc": false,
                            "plugins": [
                                "dynamic-import-webpack"
                            ]
                        }
                    }
                ],
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
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        ...App.htmls,
        new firstPlugin({options: true})
        // new HtmlWebpackPlugin({
        //         chunks:[ 'index', 'a' ],
        //         template: './app/pages/index/index.html',
        //         filename: 'index.html',
        //     })
    ],
    
    devServer: {    
        port:9000,
        inline:true,
        hot:true,
        disableHostCheck: true,
        // proxy: {
        //     '/act': {
        //         target: 'cc.com',
        //         secure: false
        //     }
        // }
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


