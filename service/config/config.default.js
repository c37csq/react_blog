/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1574941075683_4881';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mysql = {
    client: {
      host:'localhost',
      port:'3306',
      user:'root',
      password:'c37csq',
      database:'react_blog',
    },
    app:true,
    agent:false,
  }
//解决跨越问题
  config.security = {
    csrf: {
      enable: false,
      domainWhiteList: ['*']
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: 'http://127.0.0.1:3000',
    credentials: true, //允许Cookies可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,UPDATE,DELETE,PATCH,OPTIONS'
  }

  return {
    ...config,
    ...userConfig,
  };
};
