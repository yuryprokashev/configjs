/**
 *Created by py on 21/01/2017
 */

'use strict';

module.exports = (configObject, isProd) => {

    let config;

    let configService = {};

    if(isProd === 1) {
        config = configObject.PROD;
    }
    else if(isProd === 0) {
        config = configObject.TEST;
    }

    configService.getServiceConfig = (serviceName, property) => {
        if(property === undefined) {
            return config[serviceName];
        }
        else {
            return config[serviceName][property];
        }
    };

    configService.getAll = () => {
        return config;
    };

    return configService;

};