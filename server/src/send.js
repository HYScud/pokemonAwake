const sendEmail = require('./sendEmail.js');
class sendTool {
    constructor() {
        this.email = "";
        this.emailContent = {};
    }
    initFormate(code) {
        this.email = {
            title: '自制口袋妖怪觉醒---邮箱验证码',
            body: `
                    <h1>您好：</h1>
                    <p style="font-size: 18px;color:#000;">
                        您的验证码为：
                        <span style="font-size: 16px;color:#f00;"> ${ code }， </span>
                        您当前正在<span style="color:#00FF00;">口袋妖怪觉醒</span>注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                    </p>
                    <p style="font-size: 1.5rem;color:#999;">60秒内有效</p>
                    `
        }
    }
    initContent(toUserEmail, code) {
        //this.randomNum();
        this.initFormate(code);
        this.emailContent = {
            from: 'hyscud@163.com', // 发件人地址
            to: toUserEmail, // 收件人地址，多个收件人可以使用逗号分隔
            subject: this.email.title, // 邮件标题
            html: this.email.body // 邮件内容
        };
        this.send()
    }
    send() {
        sendEmail.send(this.emailContent)
    }
}
global.emailTool = new sendTool()
module.exports = (email, code) => {
    emailTool.initContent(email, code)
}