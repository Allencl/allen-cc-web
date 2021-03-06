const path = require('path');
let timeStamp = new Date().getTime();

module.exports = {
    publicPath:"./",
    devServer: {
        disableHostCheck: true,
            // proxy: {
            //     '': {
            //         // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/d
            //         // target: 'http://10.4.11.207:8081',
            //         target:process.env.VUE_APP_SERVER_API_BASE,
            //         // 允许跨域
            //         changeOrigin: true,
            //         ws: true,
            //         pathRewrite: {
            //             '^/': '/'
            //         }
            //     },
            // }
    },
    configureWebpack:{
        output: { 
            filename: `js/js[name].${timeStamp}.js`,
            chunkFilename: `js/chunk.[id].${timeStamp}.js`,
        },    
        performance: {
		    hints:false
	    },
        resolve:{
            alias:{
                '@styles':path.resolve('./src/styles'),
                '@src':path.resolve('./src'),
                '@assets':path.resolve('./src/assets'),
                // '@view':path.resolve('./view'),
            }
        }
    },
    css: { 
        extract: { 
            filename: `css/[name].${timeStamp}.css`,
            chunkFilename: `css/chunk.[id].${timeStamp}.css`,
        }
    }    
};