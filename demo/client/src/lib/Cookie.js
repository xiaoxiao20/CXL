let Cookie = (function () {

    // 读取key的值
    function getItem(key) {
        //"age=19; name=zs" ==> {name:"zs",age:19} 
        let str = document.cookie;
        let o = {};
        let arr = str.split("; "); //["name=zs","age=19","username=rick"];
        arr.forEach(ele => {
            let data = ele.split("="); //["name","zs"];
            let key = data[0];
            let val = data[1];
            o[key] = val; //o.name = "zs" | o.age = 19;
        });
        return o[key];
    }

    // 设置值
    function setItem(key, val, day) {
        if (!day) {
            /* 默认有效期 */
            document.cookie = `${key}=${val}`
        } else {
            /* 设置有效期 */
            let date = new Date();
            date.setDate(date.getDate() + day);
            document.cookie = `${key}=${val};expires=` + date;
        }
    }

    // 获取cookie中所有的key值
    function getKeys() {
        let str = document.cookie;
        let arr = str.split("; ");
        let keys = [];
        arr.forEach(ele => {
            let data = ele.split("="); //["name","zs"];
            let key = data[0];
            keys.push(key);
        });
        return keys;
    }

    // 删除某个key键值对
    function removeItem(key) {
        setItem(key, null, -1);
    }

    // 清空cookie中的数据
    function clear() {
        let keys = getKeys(); // ["username", "phone"]
        keys.forEach(ele => removeItem(ele));
    }

    return { getItem, setItem, getKeys, removeItem, clear };
})()