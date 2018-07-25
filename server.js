var fs = require('fs');
var cluster = require('cluster');
var config = require('./config/config');
var child_process = require('child_process');

let startMode = config.startMode;
if (startMode == 'deploy') {

} else {
  cluster.setupMaster({ exec: './server/server' });
  cluster.fork();

  cluster.setupMaster({ exec: './server/api/apiServer' });
  cluster.fork();

  child_process.exec('mongod');
}