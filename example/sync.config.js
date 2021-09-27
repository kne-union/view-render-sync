const axios = require('axios');

let cookies;

module.exports = {
    basDir: 'src/',
    targetDir: '/talent-view',
    saveFile: async ({path, content}) => {
        if (!cookies) {
            const res = await axios.post('http://lite.knx.com/api/v1/user/login', {
                username: '13120827721',
                type: 'password',
                token: Number.parseInt(Math.random() * 100000).toString(),
                password: 'e10adc3949ba59abbe56e057f20f883e'
            });
            cookies = res.headers['set-cookie'].map((str) => str.split(';')[0]).join(';')
        }
        const res = await axios.post('http://lite.knx.com/api/v1/admin/view/autoCreate', {
            path,
            content: JSON.parse(content)
        }, {
            headers: {
                "Content-Type": "application/json",
                "x-app-code": "RECRUITMENT",
                "Cookie": cookies
            }
        });

        return res.data;
    }
};