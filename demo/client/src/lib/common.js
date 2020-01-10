//移入显示，移出隐藏
function HiddenShow(btn, ele) {
    btn.onmouseover = function () {
        ele.style.display = 'block';

    }
    btn.onmouseout = function () {
        ele.style.display = 'none';
    }
}


//生成n位随机码
function code(n) {
    var str = 'zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP1234567890';
    var html = '';
    for (var i = 1; i <= n; i++) {
        var num = parseInt(Math.random() * str.length);
        var val = '<span>' + str[num] + '</span>';
        html += val;
    }
    return html;
}


//颜色以十六进制表示
function yanse() {
    var $long = '#';
    var long = '0123456789abcdef';
    for (var l = 0; l <= 5; l++) {
        var num1 = parseInt(Math.random() * long.length);
        $long += long[num1];
    }
    return $long;
}


//ranNum(min,max),有上、下限的随机数
function ranNum(min, max) {
    var val = parseInt(Math.random() * (max + 1 - min)) + min;
    return val;
}


//冒泡排序
function maopao(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
        for (var i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i] > arr[i + 1]) {
                var k = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = k;
            }
        }
    }
    return arr;
}



//去重
function norepeat(html) {
    if (html) {
        var str = '';
        var num = 1;
        for (var i in html) {
            if (str.indexOf(html[i]) == -1) {
                str += html[i];
            }
        }
        return str;
    }
    alert('请输入非空字符串！')
}

//正则，一些不雅文字不能出现
function zzhe(i) {
    var arr = ['fuck', '操', '小学生', '妈蛋', '反清复明', '金正恩', '垃圾'];
    arr.forEach(function (item) {
        var reg = new RegExp(item, 'ig');
        i = i.replace(reg, '***');
    });
    return i;
}

//统计字符出现的次数
function time(html) {
    html1 = html.split('');//字符串转换为数组
    console.log(html1);
    var obj = {};
    html1.forEach(function (item) {
        if (obj[item]) {
            obj[item]++;
        }
        if (!obj[item]) {
            obj[item] = 1;//键名=键值
        }

    });
    console.log(obj);
    return obj;
}



//把一位数变成两位数，如08
function todb(num) {
    if (num < 10) {
        return '0' + num;
    }
    else {
        return '' + num;
    }
}


//把时间化成时，分，秒的格式，num是秒
function when(num) {
    var secs = num % 60;
    var mins = parseInt(num / 60) % 60;
    var hours = parseInt(num / 60 / 60) % 24;
    var days = parseInt(num / 60 / 60 / 24);
    return {//想返回多个参数时，可以使用对象
        day: days,
        hour: hours,
        min: mins,
        sec: secs
    };
}


//网站地址url，提取参数部分做成对象-----1
function StrTObj() {
    var json = {};
    // var str=decodeURI(location.href).split('?');截取网址的？后面部分,截取后位长度是2的数组，不包括?
    var html = str.split('?')[1];//读取数组中的元素，为字符串name=chen&price=phone&adr=gz
    html = html.split('&');//(3) ["name=chen", "price=phone", "adr=gz"]
    console.log(html);
    //再从=切割，有三次切割可以使用循环
    for (var i = 0; i < html.length; i++) {
        var arr = html[i].split('=');//对每一个参数进行切割
        json[arr[0]] = arr[1];//每切割好一个参数，就存到json中，避免被覆盖
    }
    return json;
}


// 网站地址url，提取参数部分做成对象-----2
function toobj(str) {
    var html1 = str.split('?')[1];
    var html2 = html1.split('#')[0];
    var html = html2.split('&');
    var obj = {};
    for (var i in html) {
        var string = html[i].split('=');
        obj[string[0]] = string[1];
    }
    console.log(obj);
    return obj;
}


//给你一个对象，封装成参数拼接在网站后面
function tostr() {
    var html = '';
    for (var i in obj) {
        html += i + '=' + obj[i] + '&';//obj[i].读取键值
    }
    var html2 = html.slice(0, -1);//截取字符串，不要最后一个&
    console.log(html2);
    str += html2;//str是需要拼接的网站
    return str;
}


/*要注意兼容问题，firstElementChild----IE9+（不包括9）
                     firstchild---IE9-
                     调用下面的封装函数firstChild();
                 lastElementChild,previousElementSibling,nextElementSibling同样有兼容问题

    */
function firstChild(parent) {
    if (parent.firstElementChild) {
        //高级浏览器
        return parent.firstElementChild;
    }
    else {
        //低级浏览器
        return parent.firstChild;
    }
};
function lastChild(parent) {
    if (parent.lastElementChild) {
        //高级浏览器
        return parent.lastElementChild;
    }
    else {
        //低级浏览器
        return parent.lastChild;
    }
};
function pre(Element) {
    if (Element.previousElementSibling) {
        //高级浏览器
        return Element.previousElementSibling;
    }
    else {
        //低级浏览器
        return Element.previousSibling;
    }
};
function next(Element) {
    if (Element.nextElementSibling) {
        //高级浏览器
        return Element.nextElementSibling;
    }
    else {
        //低级浏览器
        return Element.nextSibling;
    }
};

//获取样式的浏览器兼容
// getComputedStyle(element,false).属性名/[变量名]
// element.currentStyle.属性名/[变量名]
function getstyle(element, attr) {
    if (getComputedStyle(element, false)) {
        //高版本浏览器IE9+
        return getComputedStyle(element, false)[attr];
    }
    else {
        return element.currentStyle[attr];
    }
};

//获取样式(包括行内、内部、外部样式)
// ---getComputedStyle(element,false).属性名/[变量名]
// *ie9+
// * false不管伪元素的样式，可after,brfore等伪元素名
// ---element.currentStyle.属性名/[变量名]
// *ir8-
function getstyle(element, attr) {
    if (getComputedStyle(element, false)) {
        return getComputedStyle(element, false)[attr];
    }
    else {
        return element.currentStyle[attr];
    }
}

//获取和设置样式---利用css()传参
//获取：css(element,'width');
//设置：css(element,'width','100px');
function cssSty() {
    if (arguments.length == 2) {
        //获取样式
        if (getComputedStyle(arguments[0], false)[arguments[1]]) {
            //高级浏览器
            return getComputedStyle(arguments[0], false)[arguments[1]];
        }
        else {
            //低级浏览器
            return arguments[0].currentStyle[arguments[1]];
        }
    }
    else if (arguments.length == 3) {
        //设置行内样式
        arguments[0].style[arguments[1]] = arguments[2];
    }
};

//该函数接受一个属性和对象参数，检查该属性是否存在且只存在于原型对象上。
function checkPro(o, pro) {
    if (pro in o) {
        if (o.hasOwnProperty(pro)) {
            //该属性是实例属性
            console.log('实例属性', o.hasOwnProperty(pro))
        }
        else {
            console.log('该属性存在于原型对象上')
        }
    }
    else {
        console.log('该属性不存在')
    }
};
//调用，checkPro(p1,'name');


//深度拷贝，无论是什么类型都可以拷贝
function deepCopy(target) {
    if (target == null) return target;
    if (typeof target != "object") return target;
    if (target instanceof Date) return new Date(target.getTime());
    if (target instanceof RegExp) return new RegExp(target);
    let t = new target.constructor;
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            t[key] = deepCopy(target[key])
        }
    }
    return t;
}


//为对象中所有的成员都添加监听(读和写)
function Observer(target) {
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            let element = target[key];

            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: true,
                set(val) {
                    console.log(`监听${key}到-写`);
                    element = val;
                },
                get() {
                    console.log(`监听${key}到-读`);
                    return element;
                }
            })
        }
    }
}

//Ajax去掉中文乱码
// header("Content-type:text/html;charset=utf-8");
//Ajax中post方法传参，请求体的固定语句
// xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


//Ajax封装get和post方法请求方法
//get方法的封装
function getAjax(options) {
    options.type = 'get';
    ajax(options);
};
//post方法的封装
function postAjax(options) {
    options.type = 'post';
    ajax(options);
};
//get和post请求方法的共同体代码封装
function ajax(options) {
    let { type, url, data, success, error, time } = options;//使用对象的解构
    time = time || 10000;//设置请求超时的时长
    //001--创建请求对象
    let xhr = new XMLHttpRequest;
    //002---设置请求对象
    if (type == 'get') {
        url = encodeURI(url + getString(data));
        xhr.open('get', url, true);//考虑get方法的参数字符串
        xhr.send();
    }
    if (type == 'post') {
        xhr.open('post', url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//这句代码严格放在这里
        xhr.send(objToString(data));//
    }
    //解决请求超时
    let timer = setTimeout(() => {
        xhr.abort();
        alert('网络繁忙~~~~');
    }, time);
    //003---监听响应转态
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            clearTimeout(timer);
            if (xhr.status == 200) {
                success(xhr);
            }
            else {
                error(xhr);
            }
        }
    }
};

//封装一个对象转变成字符串的函数，用于get的查询字符串和post的请求体中
function objToString(o) {
    let arr = [];
    for (const key in o) {
        if (o.hasOwnProperty(key)) {
            const element = o[key];
            arr.push(`${key}=${element}`);
        }
    }
    return arr.join('&');
};
//封装一个函数完成get方法的网站查询字符串拼接，包括?以及解决缓存问题
function getString(o) {
    if (o == null) return "?t=" + Math.random();
    else {
        return `?${objToString(o)}&t=${Math.random()}`;
    }
}


//  Base64编码->  字符串  -Base64解码->  还原为之前的数据
function base64Encode(str) {
    // Base64编码
    return window.btoa(unescape(encodeURIComponent(str)));
}

function base64Decode(str) {
    // -Base64解码
    return decodeURIComponent(escape(window.atob(str)));
}