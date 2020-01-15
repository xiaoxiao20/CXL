class MainContent2 {
    constructor(data) {
        this.root = null;
        this.data = data;
        this.timer = null;
        this.num = 0;
    }
    init() {
        this.randler();
        this.setIntervalEvent();
        this.clickEvent();
    }
    randler() {
        // 数据拼接
        this.root = $("<div class='content2'></div>");
        let str = `<div class="title">
                    <p class="fl">当季推荐</p>
                    <p class="fr">
                        <span class="prev">
                            <</span> <span>
                                <span class="runNum">1</span><span>/5</span>
                        </span>
                        <span class="next">></span>
                    </p>
                    </div>`;
        let str1 = this.data.map(function (val, index) {
            let str2 = val.tabTitle.map(function (val, index) {
                return `<a class='${index == 0 ? 'active2' : ''}' href="./01.index.html">${val}</a>`
            }).join('');
            // console.log(str2);
            let str3 = val.src.map(function (val, index) {
                let str4 = val.map(function (val, index) {
                    return `<div class="item">
                                <img src="${val}" alt="">
                            </div>`
                }).join('');
                return `<div class="tab ${index == 0 ? 'current3' : ''}">${str4}</div>`
            }).join('');
            return `
                  <div class="repeat-box ${index == 0 ? 'current2' : ''}">
                    <div class="main-top">${str2}</div>
                    <div class="main-bt">${str3}</div>
                  </div>
                `
        }).join('');

        let html = `${str}${str1}`
        $(this.root).append(html);
        $(this.root).insertBefore(".footer");
    }
    setIntervalEvent() {
        // 自动切换
        $('.content2 .main-top').find('a').mouseenter(function () {
            $(this).addClass('active2').siblings().removeClass('active2');
            $('.content2 .main-bt').find('.tab').eq($(this).index()).addClass('current3').siblings().removeClass('current3');
        });

        // setTime(setTime);
        // function setTime(callback) {
        //     let num = $('.current2').index();
        //     setInterval(() => {
        //         $('.repeat-box').eq(num + 1).addClass('current2').siblings().removeClass('current2');
        //         // callback();
        //     }, 1000);
        // }
    }
    clickEvent() {
        // 点击切换
        this.next();
    }
    next() {
        // 下一张

        $('.content2 .next').click(() => {
            this.num = $('.content2 .current2').index()
            $('.content2 .repeat-box').eq(this.num).addClass('current2').siblings().removeClass('current2')
            console.log(this.num);
        });
        $('.content2 .prev').click(() => {
            console.log(this.num);
            this.num--;
            if (this.num == 1) return;
            // this.num = $('.content2 .current2').index();
            $('.content2 .repeat-box').eq(this.num - 1).addClass('current2').siblings().removeClass('current2')
        });
    }
    prev() {
        // 上一张
    }
}

