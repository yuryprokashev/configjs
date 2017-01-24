/**
 *Created by py on 21/01/2017
 */
'use strict';
module.exports = (configService, kafkaService) => {

    let configCtrl = {};

    configCtrl.getAll = (kafkaMessage) => {
        let context, query, data;

        let result;

        context = kafkaService.extractContext(kafkaMessage);
        // query = extractQuery(kafkaMessage);
        // data = extractWriteData(kafkaMessage);

        result = configService.getAll();
        context.response = result;
        kafkaService.send(kafkaService.makeResponseTopic(kafkaMessage, context));
    };

    return configCtrl;
};