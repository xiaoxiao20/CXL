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
        // $('#soukuan').append(this.root);
    }
    setIntervalEvent() {
        // 自动切换
        $('.content1 .main-top').find('a').mouseenter(function () {
            $(this).addClass('active2').siblings().removeClass('active2');
            $('.main-bt').find('.tab').eq($(this).index()).addClass('current3').siblings().removeClass('current3');
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
        this.num = $('.content1 .current2').index();
        console.log(this.num);
    }
    nex() {
        // 下一张

    }
    prev() {
        // 上一张
    }
}

// let arr = [];
// $('.j-recommend_shops').find('.data-split').each(function (index, val) {
//     let o = {};
//     o.tabTitle = [];
//     $(val).find('.item_box').each(function (index, val) {
//         o.tabTitle.push($(val).find('.item').text());
//     });
//     o.src = [];
//     $(val).find('.recommend_shops_list').each(function (index, val) {
//         let a = [];
//         $(val).find('.item_img_inner').each(function (index, val) {
//             a.push($(val).find('img').attr('src'));
//         });
//         o.src.push(a);
//     });
//     arr.push(o);
// })