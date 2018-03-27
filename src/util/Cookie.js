export default {
    /**
     * 设置cookie
     * @param {string} key 
     * @param {string|number} value 
     * @param {number} day 
     */
    set(key, value, day) {
        let Days = day ? day : 30,
            exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    /**
     * 获取cookie
     * @param {string} name 
     * @returns 
     */
    get(name) {
        let arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    /**
     * 删除cookie
     * @param {string} name 
     */
    del(name) {
        let exp = new Date(),
            cval = this.get(name);
        exp.setTime(exp.getTime() - 1);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }
}