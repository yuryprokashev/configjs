/**
 *Created by py on 21/01/2017
 */

'use strict';

const fs = require('fs');

module.exports = fileName => {
    let configData, configObject;
    configData = fs.readFileSync(`${__dirname}/${fileName}`, 'utf-8');
    configObject = JSON.parse(configData);
    return configObject;
};