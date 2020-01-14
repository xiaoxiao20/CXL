class Banner2 {
    constructor(imgs, wid) {
        this.root = null;
        this.data = imgs;
        this.len = Math.ceil(this.data.length / 5);
        this.width = wid;
        this.index = 0;
        this.timer = null;
    }
    init() {
        this.randler();
        this.eventFunction();
        this.mouseenterEvent();
    }
    randler() {
        // 渲染元素
        this.root = $("<div class='ban2-2'></div>");
        $(this.root).append($("<span class='sp sp1'><</span><span class='sp sp2'>></span>"));
        let str = this.data.map(function (ele, index) {
            return ` <img src="${ele}" alt="">`
        }).join('');
        let W = this.len * this.width + 'px';
        let str1 = `<div class="imgBan1">${str}</div>`;
        $(this.root).append(str1);
        // console.log(this.wid);

        $('.ban2-1').append(this.root);

        $('.imgBan1').css('width', W)
        console.log(W);
    }
    mouseenterEvent() {
        // 01--自动切换
        this.timer = setInterval(() => {
            this.next();
        }, 1000);
    }
    eventFunction() {
        // 实现切换、点击等功能
        // 02--点击切换
        $('.sp1').click(() => {
            this.prev();
        }
        );
        $('.sp2').click(() => {
            this.next();

        });
        // 鼠标移入的时候停止计数器
        $('.ban2-2').mouseenter(() => {
            // console.log($('.ban1-1'));
            clearInterval(this.timer);
        }).mouseleave(() => {
            this.mouseenterEvent();
        })
    }

    next() {
        // 下一张
        this.index++;
        if (this.index == this.len) {
            this.index = 0;
        }
        $('.imgBan1').css('left', -this.index * this.width + 'px');
        // console.log($('.imgBan').css('left'));
    }
    prev() {
        // 上一张
        this.index--;
        if (this.index == -1) {
            this.index = this.len - 1;
        }
        $('.imgBan1').css('left', -this.index * this.width + 'px');
    }


}