let fs = require('fs');
const { setupMaster, fork } = require('cluster');
const { exec, execSync } = require('child_process');
const config = require('./config/config');

let startMode = config.startMode;
let start = Date.now();

const outputProcess = () => {
  execSync('pm2 list', {
    stdio: 'inherit',
  });
}

if (startMode == 'deploy') {
  execSync('yarn add colors@1.1.2', { stdio: ['pipe'] });
  var colors = require('colors/safe');

  try {
    console.info(colors.red('警告：开始停止博客进程'));
    execSync('pm2 delete server');
    execSync('pm2 delete db');
    execSync('pm2 delete api');
  } catch (e) { } finally {
    console.log(colors.red('警告：已经停止博客进程'))
  }

  try {
    console.info(colors.green('更新：更新主工程'));
    execSync('git pull', {
      stdio: 'inherit',
    })
  } catch (e) {
    console.log(colors.red('警告：更新代码失败'))
  }

  if (fs.existsSync('./resource/project')) {
    console.info(colors.green('前台：开始构建react工程'));
    execSync('webpack --env production', {
      stdio: 'inherit',
      cwd: './resource/project',
    })
  }

  console.info(colors.cyan('服务:安装Web工程依赖包'));
  execSync('yarn install', {
    stdio: 'inherit',
  });

  exec(`pm2 start mongod --name=db -o /dev/null -e /dev/null -i ${config.cluster}`, (e, stdo, stoe) => {
    outputProcess();
  });
  exec(`pm2 start server/server.js --name=server -o /dev/null -e /dev/null -i ${config.cluster}`, (e, stdo, stde) => {
    outputProcess();
  })
  exec(`pm2 start server/api/apiServer.js --name=api -o /dev/null -e /dev/null -i ${config.cluster}`, (e, stdo, stde) => {
    outputProcess();
  })
  console.info(colors.green(`发布完成，用时累计：${Math.round((Date.now() - start) / 1000)}S`));

} else {
  setupMaster({ exec: './server/server' });
  fork();
  setupMaster({ exec: './server/api/apiServer' });
  fork();
  exec('mongod');
}