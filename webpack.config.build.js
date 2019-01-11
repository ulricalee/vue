const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const glob = require('glob')

// const appPath = {
//     template : 'pages', //模板目录
//     entryjs : 'app', //对应模板的js目录
//     vuejs : 'main.js' //vue 入口js文件名
// }

// var App = (function(){
 
//     var entry = {}

//     var htmls = []

//     glob.sync(`./${appPath.entryjs}/*/${appPath.vuejs}`).forEach( filepath => {
//         let _app = filepath.split('/')[2]

//         entry[_app] = filepath

//         htmls.push(
//             new HtmlWebpackPlugin({
//                 chunks:[_app],
//                 template: `./${appPath.entryjs}/${_app}/${_app}.html`,
//                 filename: `${_app}.html`,
//                 hash: true
//             })
//         )

//     })

//     return {
//         entry,
//         htmls
//     }

// })()
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
                filename: `${_appname}.html`, //输出的文件名
                hash: true
            })
        )



    })
    return {
        entry,
        htmls
    }

})()


const config = {
    mode: 'production',
    entry:App.entry,
    output:{
        filename:'./public/js/[name].js',
        path:path.join(__dirname, 'build')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 3,
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: -10,
                    enforce: true
                }

            }
        }
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
                use: ExtractTextPlugin.extract({
                     fallback: {
                         loader: 'style-loader',
                         options: {
                             singleton: true
                         }
                     },
                     use: [
                         {
                             loader: 'css-loader',
                             options: {
                                 minimize: true
                             }
                         }  
                     ]
                })
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
                            name: '[name]-[hash:5].[ext]',
                            outputPath:'/public/imgaes'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new ExtractTextPlugin({
            filename: '/public/css/[name].css',
        }),
        ...App.htmls
    ]
}

module.exports = config