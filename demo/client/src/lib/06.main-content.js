class MainContent {
    constructor(data) {
        this.root = null;
        this.data = data;
        this.timer = null;
        this.num = null;
    }
    init() {
        this.randler();
        this.setIntervalEvent();
        this.clickEvent();
    }
    randler() {
        // 数据拼接
        this.root = $("<div class='content1'></div>");
        let str = `<div class="title">
                    <p class="fl">实力档口</p>
                    <p class="fr">
                        <span class="prev">
                            <</span> <span>
                                <span class="runNum">1</span><span>/5</span>
                        </span>
                        <span class="next">></span>
                    </p>
                    </div>`;
        let str1 = this.data.map(function (val, key) {
            let str2 = val.tabTitle.map(function (val, index) {
                return `<a class='${index == 0 ? 'active2' : ''}' href="./01.index.html">${val}</a>`
            }).join('');
            // console.log(str2);
            let str5 = val.price.map(function (val, index) {
                let str6 = val.map(function (val, index) {
                    return `<p class="price">${val}</p>`
                });
                return str6;
            });
            let str3 = val.src.map(function (val, index1) {
                let str4 = val.map(function (val, index) {
                    return `<div class="item">
                                <img src="${val}" alt="">
                                ${str5[index1][index]}
                            </div>`
                }).join('');
                return `<div class="tab ${index1 == 0 ? 'current3' : ''}">${str4}</div>`
            }).join('');

            return `
                  <div class="repeat-box ${key == 0 ? 'current2' : ''}">
                    <div class="main-top">${str2}</div>
                    <div class="main-bt">${str3}</div>
                  </div>
                `
        }).join('');

        let html = `${str}${str1}`
        $(this.root).append(html);
        $(this.root).insertAfter(".bg2");

        // 点击图片跳转到详情页
        $('#soukuan').on('click', '.content1 .item img', function () {
            if ($(this).next().text() == '款式多多，慢慢看哦~~') return;
            let price = $(this).next().text().slice(1) * 1;
            let child = $(this).parents('.tab');
            let child_index = $(this).parents('.main-bt').find(child).index();
            let title = $(this).parents('.main-bt').prev().find('a').eq(child_index).text();
            // console.log($(this), 'bababba', title);
            location.href = `./05.details.html?src=${$(this).attr('src')}&price=${price}&title=${title}`;

        })
        // $('#soukuan').append(this.root);
    }
    setIntervalEvent() {
        this.timer = setInterval(() => {
            this.num = $('.content1').find('.current2').index();
            if (this.num >= 5) {
                this.num = 0
            };
            $('.content1 .repeat-box').eq(this.num).addClass('current2').siblings().removeClass('current2')
            $('.content1 .runNum').text(this.num + 1)
        }, 1500);
    }
    clickEvent() {
        // 选项卡切换
        $('#soukuan').find('.content1 .main-top').find('a').mouseenter(function () {
            $(this).addClass('active2').siblings().removeClass('active2');
            $(this).parent().next().find('.tab').eq($(this).index()).addClass('current3').siblings().removeClass('current3');

        });
        // 点击切换
        this.next();
        this.prev();
        // 鼠标移入停止自动播放，移出恢复
        $('.content1 .repeat-box').mouseenter(() => {
            clearInterval(this.timer);
        }).mouseleave(() => {
            this.setIntervalEvent();
        });
        $('.content1 .title').find('p').eq(1).mouseenter(() => {
            clearInterval(this.timer);
        }).mouseleave(() => {
            this.setIntervalEvent();
        });
    }
    next() {
        // 下一张
        $('.content1').find('.next').click(() => {
            this.num = $('.content1').find('.current2').index();
            if (this.num >= 5) {
                this.num = 4
            };
            $('.content1 .repeat-box').eq(this.num).addClass('current2').siblings().removeClass('current2')
            $('.content1 .runNum').text(this.num + 1)
        });

    }
    prev() {
        // 上一张
        $('.content1 .prev').click(() => {
            this.num--;
            if (this.num <= 0) {
                this.num = 0
            };
            $('.content1 .repeat-box').eq(this.num).addClass('current2').siblings().removeClass('current2')
            $('.content1 .runNum').text(this.num + 1)
        });
    }
}

// let arr = [];
// $('.j_hot_shops').find('.data-split').each(function (index, val) {
//     let o = {};
//     o.tabTitle = [];
//     $(val).find('.item_box').each(function (index, val) {
//         o.tabTitle.push($(val).find('.item').text());
//     });
//     o.src = [];
//     o.price = [];
//     $(val).find('.hot_shops_list').each(function (index, val) {
//         let a = [];
//         let b = [];
//         $(val).find('.item').each(function (index, val) {
//             a.push($(val).find('img').attr('src'));
//             b.push($(val).find('.price').text());
//         });
//         o.src.push(a);
//         o.price.push(b);
//     });
//     arr.push(o);
// })