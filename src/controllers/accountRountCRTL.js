'use strict';

const path = require('path');
const fs = require('fs');
const captchapng = require('captchapng');

// 调用数据库控制器
const databasemanager = require(path.join(__dirname, "../tools/databasemanager.js"))
// 跳转登录页面
exports.getLoinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login.html'));
}

// 图片验证码逻辑
exports.getVcodeImage = (req, res) => {
    const vodeNumber = parseInt(Math.random() * 9000 + 1000);
    req.session.vcode = vodeNumber;
    var p = new captchapng(80, 30, vodeNumber); // width,height,numeric captcha 
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}


// 登录验证
exports.login = (req, res) => {
    // 获取post提交过来的参数
    const params = req.body;
    const result = {
        status: 2,
        message: '登录成功!'
    };
    // 校验验证码
    if (req.session.vcode != params.vcode) {
        result.status = 0;
        result.message = "验证码错误";
        res.json(result);
        return;
    }
    // 验证登录的用户名和密码
    // 优化数据库链接路径
    databasemanager.findOne('account', {
        username: params.username,
        password: params.password
    }, (err, doc) => {
        if (doc == null) {
            result.status = 1;
            result.message = "用户名或密码错误"
        } else {
            // 登录成功判定
            req.session.username = params.username;
        }
        res.json(result);
        db.close();
    })

    // 退出
    exports.logout = (req, res) => {
        req.session.username = null;
        //退出后跳回到登录页面
        res.setHeader("Content-Type", "text/html;charset=utf-8")
        res.end("<script>window.location.href='/account/login'</script>")
    }

    // 获取注册页面
    exports.getRegisterPage = (req, res) => {
        res.sendFile(path.join(__dirname, '../view/register.html'));
    }
    // 注册验证
    exports.register = (req, res) => {
        const responseResult = {
            status: 0,
            message: "注册成功"
        };
        databasemanager.insertOne('account', req.body, (err, result) => {
            if (result == null) { //新增失败
                responseResult.status = 1
                responseResult.message = "注册失败"
            }

            res.send(responseResult)
        })
    }

}