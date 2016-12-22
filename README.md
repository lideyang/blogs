# blog

### 目录结构

```
.      
├── client                                    // 客户端
    ├── public                                // 静态css图片文件外部插件
    ├── src                                   // 生产目录
        ├── api                               // 前后端同构API
        ├── controller                        // 服务端渲染控制器（学会redux再同构。。)
        ├── js                                // 前后端同构React组件
        ├── less                              // bootstrap和博客less
    ├── routes.js                        	  // 服务端路由（还需同构)
    ├── server.js                   		  // 服务端渲染编译前文件
    ├── webpack.config.dev.client.js          // 开发的客户端Webpack配置文件
    ├── webpack.config.dev.proxy.js           // 开发的代理中间件Webpack配置文件（和server分离不用一起重启)
    ├── webpack.config.dev.server.js          // 开发的服务端渲染Webpack配置文件
    ├── webpack.dll.config.js                 // react等不用经常编译的框架打包
├── server                      			  // 服务端具体业务api
│   ├── config 								  // 开发线上配置文件
│   ├── models                  			  // mongodb 增删改查
│   ├── routes               				  // api路由
│   ├── app.js             					  // 服务启动入口
.
```