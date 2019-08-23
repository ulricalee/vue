const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appPath = {
    template : 'pages',
    entryjs : 'app'
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
            // {
            //     test: /\.(gif|png|jpeg|jpg|svg)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10000,
            //                 name: '[name]-[hash:5].[ext]'
            //                 // publicPath:'@'
            //                 // outputPath: 'images/'
            //             }
            //         }
            //     ]
            // }
        ]
    }
}