let g_Tool = {
    log: (...args) => {
        function getErr() {
            try {
                throw new Error('')
            } catch (error) {
                return error.stack;
            }
        }
        let stack = getErr();
        let stackList = stack.split("\n");
        let s = stackList[3];
        //let list = s.split(":");
        //console.log(list)
        let dateList = getTime();
        let date = `${dateList.year}-${fixNum(dateList.month)}-${fixNum(dateList.date)} 星期${dateList.day} ${fixNum(dateList.hour)}:${fixNum(dateList.min)}:${fixNum(dateList.sec)}`
            //let path = list[1].split("\\server\\")[1];
            //console.log(date + " " + path + ":" + list[2] + ":" + list[3].split(")")[0], ...args)
        console.log('\x1B[35m' + date + " " + s.split("\\server\\")[1].split(")")[0] + '\x1b[39m', ...args)
    },
    fixNum(source, n = 2) {
        if (('' + source).length >= n) {
            return source
        }
        return (new Array(n).join('0') + source).slice(-n)
    },
    getTime: () => {
        let date = new Date()
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
            day: date.getDay(),
            hour: date.getHours(),
            min: date.getMinutes(),
            sec: date.getSeconds()
        }
    },
    randomNum() {
        this.emailCode = (function captchaNumber() {
            let num = [];
            for (let i = 0; i < 6; i++) {
                num[i] = parseInt(Math.random() * 10);
            }
            return num.join('');
        })();
        return this.emailCode;
    }
}
for (let name in g_Tool) {
    global[name] = g_Tool[name]
}