$(() => {

    // 002--分页布局
    $.ajax({
        type: "get",
        url: "../../../server/03.listPage.php",
        dataType: "json",
        success: function (response) {
            // console.log(response.count);
            // 生成页数的按钮
            let html = '';
            for (let i = 0, len = response.count; i < len; i++) {
                html += `<a href="javascript:;">${i + 1}</a>`
            };
            $('.pages').html(html);
            // 默认生成第一页的数据进行渲染
            getPage(1, type);
        }
    });

    // 页面点击事件
    $('.pages').on('click', 'a', function () {
        let index = $(this).index();
        getPage(index + 1, type);
    });

    let type = 'default';
    // 排序方式选择
    $('.btn-class').on('click', 'span', function () {
        type = $(this).data('type');
        getPage(1, type);
    })

    // 003--发送请求获取数据进行渲染,根据点击的页数和选择的排序方式
    function getPage(index, type) {
        $.ajax({
            type: "get",
            url: "../../../server/04.order.php",
            data: `page=${index}&type=${type}`,
            dataType: "json",
            success: function (response) {
                console.log(response);
                randler(response, index);
            }
        });

    }
    // 001--数据渲染
    function randler(data, index) {
        let str = data.map(function (val, key) {
            return ` <li>
                    <div class="pic">
                        <img class="bigpic" src="${val.src}" alt="">
                        <img class="minlogo" src="${val.minpic ? val.minpic : ''}" alt="">
                     </div>
                     <div class="desc">
                        <div class="price-sales clearfix">
                            <span class="price">￥${val.price}</span><span class="sales">${val.sales}</span>
                        </div>
                        <p class="title">
                            <a href="./01.index.html">${val.title}</a>
                        </p>
                        <div class="addr clearfix">
                            <span class="adr">${val.adr}</span><span class="j-btn">${val.j_clip_button}</span>
                        </div>
                        <div class="foot">
                        <span>
                            <img src="${val.minlogoS ? val.minlogoS : ''}" alt="">
                        </span>
                        <span>${val.shopName}</span>
                        <span>
                            <img src="${val.cooperateShop ? val.cooperateShop : ''}" alt="">
                        </span>
                        </div>
                     </div>
                </li>`
        }).join('');
        $('.Ulist').html(str);
        // 处理页码的选中转态
        $('.pages').children('a').eq(index - 1).addClass('active').siblings().removeClass('active');
    }

    // 人气商品
    showGoods("../../../server/05.hot-goods.php", $('.hot-bt ul'));
    function showGoods(url, ele) {
        $.ajax({
            type: "get",
            url,
            dataType: "json",
            success: function (response) {
                // console.log(response)
                let str = response.map(function (val, key) {
                    return ` <li>
                            <div class="pic">
                                <img src="${val.src}" alt="">
                            </div>
                            <div class="desc clearfix">
                                <span class="price fl">${val.price}</span><span class="addr fr">${val.addr}</span>
                            </div>
                        </li>`
                }).join('');
                ele.html(str);
            }
        });
    };
    // 右侧推荐商品
    showGoods("../../../server/06.rightgoods.php", $('.right-goods ul'))


    // screen页

    let str = sreenDate.map(function (val, index) {
        let html = val.map(function (val, key) {
            return `<a href="./01.index.html">${val}</a>`
        }).join('');
        return `<div class="sreen-rg">${html}</div>`
    });
    $('.sreen').children().each(function (index, val) {
        $(this).append(str[index])
    });
    // console.log($('.model').find('.sreen-rg').find('a'));
    $('.model').find('.sreen-rg').find('a').each(function (index, val) {
        let html = sreenSrc.map(function (val, key) {
            return `<div>
                        <img src="${val}" alt="">
                    </div>`
        });
        $(this).append(html[index]);
    });
    $('.model').find('.sreen-rg').find('a').mouseenter(function () {
        $(this).children('div').css('display', 'block');
    }).mouseleave(function () {
        $(this).children('div').css('display', 'none');
    })

    // screen页的展开和收起
    $('.market').find('span').click(function () {
        let H = $('.market .sreen-rg').css('height').slice(0, -2) * 1;
        let parentH = $(this).parent().css('height').slice(0, -2) * 1;
        console.log(H, parentH)
        if (H > parentH) {
            $(this).parent().css('height', H + 'px');
            $(this).text('收起');
        }
        else {
            $(this).parent().css('height', '36px');
            $(this).text('更多');
        }
    });


    // 数据获取
    // let arrx = [];
    // $('.goods-list').find('li').each(function (index, val) {
    //     let o = {};
    //     o.src = $(this).find('.item').find('img').eq(0).attr('src');
    //     minpic = $(this).find('.item').find('.slzz-item-logo');
    //     o.minpic = minpic.length != 0 ? $(minpic).attr('src') : '';
    //     o.price = $.trim($(this).find('.item').find('.price').text()).slice(1) * 1;
    //     o.sales = $(this).find('.item').find('.sales').text();
    //     o.title = $.trim($(this).find('.item').find('.title').text());
    //     o.adr = $.trim($(this).find('.item').find('.inner').text())
    //     o.j_clip_button = $.trim($(this).find('.item').find('.j_clip_button').text())
    //     minlogoS = $(this).find('.item').find('.item-slzz-logo');
    //     o.minlogoS = minlogoS.length != 0 ? minlogoS.find('img').attr('src') : '';
    //     cooperateShop = $(this).find('.item').find('.cooperate-shop');
    //     o.cooperateShop = cooperateShop.length != 0 ? cooperateShop.attr('src') : '';
    //     o.shopName = $(this).find('.item').find('.pos-shop-name').text();
    //     arrx.push(o);
    // });
})