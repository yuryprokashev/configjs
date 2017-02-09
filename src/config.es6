/**
 *Created by py on 21/01/2017
 */
"use strict";
const SERVICE_NAME = 'configjs';

const KAFKA_TEST = "54.154.211.165";
const KAFKA_PROD = "54.154.226.55";
const parseProcessArgs = require('./parseProcessArgs.es6');
let args = parseProcessArgs();
const IS_PROD = args[0].isProd;

let kafkaHost = (function(bool){
    let result = bool ? KAFKA_PROD : KAFKA_TEST;
    console.log(result);
    return result;
})(IS_PROD);

const EventEmitter = require('events').EventEmitter;

const kafkaBusFactory = require('my-kafka').kafkaBusFactory;
const kafkaServiceFactory = require('my-kafka').kafkaServiceFactory;
const configObjectFactory = require('./configObjectFactory.es6');
const configServiceFactory = require('./configServiceFactory.es6');
const configCtrlFactory = require('./configCtrlFactory.es6');
const telegramConfigCtrlFactory = require('./telegramConfigCtrlFactory.es6');
const httpCtrlFactory = require('./http/httpCtrlFactory.es6');
const httpServiceFactory = require('./http/httpServiceFactory.es6');
const httpClientFactory = require('./http/httpClientFactory.es6');

let kafkaBus,
    configObject,
    httpClient;

let configService,
    kafkaService,
    httpService;

let configCtrl,
    tgConfigCtrl,
    httpCtrl;

let tgConfig;

kafkaBus = kafkaBusFactory(kafkaHost, SERVICE_NAME, EventEmitter);
kafkaService = kafkaServiceFactory(kafkaBus, EventEmitter);

kafkaBus.producer.on('ready', ()=> {

    configObject = configObjectFactory('config.json');

    configService = configServiceFactory(configObject, IS_PROD);

    configCtrl = configCtrlFactory(configService, kafkaService);

    tgConfig = configService.getServiceConfig('bot');

    httpClient = httpClientFactory(tgConfig);
    httpService = httpServiceFactory(httpClient);
    httpCtrl = httpCtrlFactory(httpService, tgConfig);

    tgConfigCtrl = telegramConfigCtrlFactory(httpCtrl);
    tgConfigCtrl.configureTelegram(tgConfig).then(
        (response) => {
            console.log(response.statusCode);
        },
        (error) => {
            console.log(error);
        }
    );

});
