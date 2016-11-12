/**
 * Created by py on 16/09/16.
 */

const ConfigService = require('./ConfigService');
const parseProcessArgs = require('./parseProcessArgs');
var args = parseProcessArgs();
console.log(args);
var app = new ConfigService(args[0].isProd);
app.listen();
