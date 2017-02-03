/**
 *Created by py on 21/01/2017
 */
'use strict';
module.exports = (configService, kafkaService) => {

    let configCtrl = {};

    let kafkaListeners;

    let replyConfig,
        registerServiceHost;

    registerServiceHost = (serviceEnvObject) => {
        //TODO. implement save ip address to file
    };

    replyConfig = (kafkaMessage) => {
        let context;

        context = kafkaService.extractContext(kafkaMessage);

        registerServiceHost(context);

        if(context !== null) {
            let topic,
                isSignedRequest;

            topic = kafkaService.makeResponseTopic(kafkaMessage);
            isSignedRequest = false;
            context.response = configService.getAll();

            kafkaService.send(topic, isSignedRequest, context);
        }

    };

    kafkaListeners = configService.getServiceConfig('configjs', 'kafkaListeners');

    kafkaService.subscribe(kafkaListeners.getConfig, false, replyConfig);

    return configCtrl;
};