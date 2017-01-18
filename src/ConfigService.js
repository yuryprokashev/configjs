/**
 * Created by py on 09/08/16.
 */
'use strict';
const fs = require('fs');
const KafkaAdapter = require('./KafkaAdapter2');
const KAFKA_TEST = "54.154.211.165";
const KAFKA_PROD = "54.154.226.55";

class ConfigService {
    constructor(isProd){
        this.serviceName = 'Config-Service';
        this.config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf-8'));
        this.kafkaHost = (function(bool){
            let result = bool ? KAFKA_PROD : KAFKA_TEST;
            console.log(result);
            return result;
        })(isProd);
    }
    listen(){
        // console.log(this);
        // TODO. Записать host в отдельный файл hosts
        var _this = this;
        this.bus = new KafkaAdapter(this.kafkaHost, this.serviceName, 2);
        this.bus.producer.on('ready', function (msg) {
            // console.log(_this);
            function handleConfigRequest(msg){
                // console.log(this);
                console.log(msg);
                let message = JSON.parse(msg.value);
                let response = {
                    requestId: message.requestId,
                    responsePayload:[],
                    responseErrors:[]
                };
                if(message.isProd === true){
                    response.responsePayload.push(_this.config.PROD);
                }
                else {
                    response.responsePayload.push(_this.config.TEST);
                }
                // console.log(response.responsePayload[0]);
                _this.bus.send('get-config-response', response);
            }
            _this.bus.subscribe('get-config-request', handleConfigRequest);
        });
    }
}

module.exports = ConfigService;
