/**
 * 项目配置文件
 */

const config = {
  // node服务
  host: '127.0.0.1',
  port: 3000,

  // api服务
  apiHost: '127.0.0.1',
  apiPort: 3030,

  //数据库服务
  dbHost: 'localhost',
  dbPort: '27017',

  startMode: 'develop', // 启动模式

  cluster: 1

}

module.exports = config;