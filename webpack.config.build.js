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
                chunks:[_appname],
                template: path.join(filepath, `${_appname}.html`),
                filename: `${_appname}.html`, //输出的文件名
                hash: true
            })
        )



    })
    console.log(entry)
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
             chunks: "async",
             minSize: 30000,
             minChunks: 1,
             name: true,
            //chunks: 'all',
            //name: (m, chunks, cacheGroup) => `chunk-${cacheGroup}`,
            // minChunks: 3,
            cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        // 首先: 打包node_modules中的文件
                vendor: {
                  name: "vendor",
                  test: /[\\/]node_modules[\\/]/,
                  // chunks: "all",
                  priority: -10
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
            // {
            //     test: /\.css$/,
            //     use: ExtractTextPlugin.extract({
            //          fallback: {
            //              loader: 'style-loader',
            //              options: {
            //                  singleton: true
            //              }
            //          },
            //          use: [
            //              {
            //                  loader: 'css-loader',
            //                  options: {
            //                      minimize: true
            //                  }
            //              }

            //          ]
            //     })
            // },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            // {
            //     test: /\.scss$/,
            //     use: ExtractTextPlugin.extract({
            //       // 注意 1
            //       fallback: {
            //         loader: "style-loader"
            //       },
            //       use: [
            //         {
            //           loader: "css-loader",
            //           options: {
            //             minimize: true
            //           }
            //         },
            //         {
            //           loader: "sass-loader"
            //         },
            //         // {
            //         //   loader: "style-loader"
            //         // }
            //       ]
            //     })
            // },
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
        // new ExtractTextPlugin({
        //     filename: '/public/css/[name].css',
        //     allChunks: false
        // }),
        ...App.htmls
    ]
}

module.exports = config