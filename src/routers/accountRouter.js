'use strict';

// 引包
const express = require('express');
const path = require('path');

// 路由
const accountRouter = express.Router();
// 代码控制器
const accountRouterCRTL = require(path.join(__dirname, '../controllers/accountRountCRTL.js'));

// 跳转登录页面
accountRouter.get('/login', accountRouterCRTL.getLoinPage);
// 图片验证
accountRouter.get('/vcode', accountRouterCRTL.getVcodeImage);
// 登录模块逻辑处理
accountRouter.get('/login', accountRouterCRTL.login);


// 暴露给入口
module.exports = accountRouter;