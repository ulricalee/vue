
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const wPath = {
    pages : 'pages',
    app : 'app'
}

function getEntrys(){
 
    var _entry = {}

    glob.sync('./app/*.js').forEach( filepath => {

        let key = /([a-zA-Z])+\.js/.exec(filepath)[0].split('.')[0]
        _entry[key] = filepath

    })

    return _entry

}

function getHtmls(){

    var _array = []

    glob.sync('./app/*.js').forEach( filepath => {
        console.log(filepath)
        let key = /([a-zA-Z])+\.js/.exec(filepath)[0].split('.')[0]
        
        _array.push(
            new HtmlWebpackPlugin({
                chunks:[key],
                template: path.join(`${wPath.pages}`,`${key}.html`),
                // filename: `${key}.html`,
                //inject: true,
                // hash:true,
                //cache:false,
                // minify:{
                //     removeComments:true,
                //     collapseWhitespace: false
                // }
            })
        )
    })
    return _array

}

module.exports = {
    mode:'development',
    entry:getEntrys(),
    output:{
        filename:'[name].js',
        // path:path.join(__dirname, wPath.pages)
        //publicPath: "/app",
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        // ...getHtmls()
    ],
    
    devServer: {    
        port:9000,
        inline:true,
        hot:true,
        contentBase: path.join(__dirname, wPath.pages),

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
