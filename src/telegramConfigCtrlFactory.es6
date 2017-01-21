/**
 *Created by py on 21/01/2017
 */

'use strict';
module.exports = httpCtrl => {
    let tgCtrl ={};

    tgCtrl.configureTelegram = config => {
        return new Promise(
            (resolve, reject) => {
                httpCtrl.setWebhook({url: config.updateWebhook}).then(
                    (response) => {
                        console.log(response);
                        resolve(response);
                    },
                    (error) => {
                        console.log(error);
                        reject(error);
                    }
                );
            }
        );
    };

    return tgCtrl;
};