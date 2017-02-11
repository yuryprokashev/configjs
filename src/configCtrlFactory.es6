/**
 *Created by py on 21/01/2017
 */
'use strict';
module.exports = (configService, kafkaService) => {

    let configCtrl = {};

    let kafkaListeners;

    let replyConfig,
        registerServiceHost;

    registerServiceHost = (context) => {
        //TODO. implement save ip address to file
        console.log(`this is host to register in future ${context}`);
    };

    replyConfig = (kafkaMessage) => {
        let context;

        context = kafkaService.extractContext(kafkaMessage);
        if(context instanceof Error) {
            console.error(context);
        }
        else if(typeof context === 'string') {
            console.log(kafkaMessage);
        }
        else {
            let topic;
            registerServiceHost(context);
            topic = kafkaService.makeResponseTopic(kafkaMessage);
            context.response = configService.getAll();
            kafkaService.send(topic, context);
        }
    };

    configCtrl.start = () => {
        kafkaListeners = configService.getServiceConfig('configjs', 'kafkaListeners');
        kafkaService.subscribe(kafkaListeners.getConfig, replyConfig);
    };

    return configCtrl;
};