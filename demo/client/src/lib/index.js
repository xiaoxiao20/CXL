$(() => {
    // 导航切换
    $('.littleTitle').mouseenter(function () {
        $(this).next().show()
    }).mouseleave(function () {
        $(this).next().hide()
    })
    // 广州站显示隐藏
    $('.adr').mouseenter(function () {
        $('.memu').show();
    }).mouseleave(function () {
        $('.memu').hide();
    });

    // 尾部渲染
    // let a = []
    // $('.help_row').find('.item').each(function () {
    //     let o = [];
    //     $(this).find('.lists').find('a').each(function () {
    //         o.push($(this).attr('title'));
    //     });
    //     a.push(o)
    // })
    let footHtml = footData.map(function (ele) {
        let str = ele.map(function (val) {
            return `<a href="###">${val}</a>`
        }).join('');
        return `<div class="list">${str}</div>`
    });
    $('.foot-desc').find('.lists li').each(function (index, val) {
        $(this).find('.list').html('');
        $(this).append(footHtml[index]);
    })

    // 搜索框部分
    function sousuo(o) {
        // 这里填写，发送请求后调用函数想要做的事情
        console.log(o);//o是一个对象
        //真正的数据在o数据的g里，g是一个数组
        let data = o.data || [];//搜索的结果可能为空
        let suggests = data.suggests || [];
        let shops = data.shops || [];
        let cats = data.cats || [];
        // g的每个ele是一个对象，真正需要的信息是q
        let news = suggests.map((ele) => `<li>${ele[0]}</li>`).join('');
        let likeNews = cats.map((ele) => `<li>${ele.vcname}下分类搜索</li>`).join('');
        likeNews.app
        $('.ss-list').html(news);
        $('.ss-list').append(likeNews);
    }
    $('.header-load').find('.search .bar').bind('input propertychange', function () {
        let wq = $(this).val();
        $('.ss-list').show();
        $.ajax({
            type: "get",
            url: `https://www.vvic.com/apic/search/suggest?q=${wq}&type=item`,
            dataType: "jsonp",
            crossDomain: true,
            jsonpCallback: "sousuo",
            jsonp: "callback",
            success: function (response) {
                console.log(response);
                sousuo(response);
            }
        });
    });
    $('.header-load').find('.search .bar').blur(function () {
        $('.ss-list').hide()
    })

    // 二级导航显示隐藏 
    $('.banner1 .erji-lf').unbind('mouseenter').on('mouseenter', 'li', function (e) {
        // e.preventDefault();
        let num = $(this).index();
        console.log(num);
        $('.erji-rg').stop().animate({
            'width': '800px'
        }, 800).mouseenter(function () {
            // $('.erji-lf').find('li').eq(num).trigger('mouseenter');
            $(this).show();
        }).mouseleave(function () {
            $(this).stop().animate({
                'width': '0'
            }, 800)
        });
    }).on('mouseleave', 'li', function () {
        $('.erji-rg').stop().animate({
            'width': '0'
        }, 800);
    });
    // 轮播图右侧的选项卡
    $('.banRg1 span').mouseenter(function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.tab').eq($(this).index()).addClass('active1').siblings().removeClass('active1');

    });
    let tabStr = tabData1.map(function (val, lindex) {
        return ` <a href="###">${val}</a>`
    }).join('');
    $('.tab1').html(tabStr);
    let tabStr2 = tabData2.map(function (val, lindex) {
        return ` <a href="###">${val}</a>`
    }).join('');
    $('.tab2').html(tabStr2);

    // banner2左侧的市场栏
    let banBtDataStr = banBtData.map(function (val, index) {
        return `<a href="./01.index.html">${val}</a>`
    }).join('');
    $('.banner2').find('.memu2').html(banBtDataStr);
    // 市场展开和收起
    $('.banner2 .moreMemu').unbind('click').on('click', 'span', function () {
        let H = $(this).parent().prev().css('height').slice(0, -2) * 1;
        let PaeH = $('.ban-left2').css('height').slice(0, -2) * 1;
        if (H > PaeH) {
            $('.ban-left2').css('height', '360px');
            $(this).text('收起市场')
        }
        else {
            $('.ban-left2').css('height', '210px');
            $(this).text('更多市场');
        }
    });
    // 旗舰店铺的功能，自动播放、点击切换
    // 下一张
    let num = 0;
    $('.flag_shop').find('.flag_next').unbind('click').click(() => {
        num = $('.flag_shop').find('.active3').index();
        num++;
        console.log(num);
        if (num > 1) {
            num = 1;
            return
        };
        $('.flag_shop_list .lists').eq(num).addClass('active3').siblings().removeClass('active3')
        $('.flag_shop .current_page').text(num + 1);
    });
    // 上一张
    $('.flag_shop .flag_prev').click(() => {
        num--;
        if (num < 0) {
            return
        };
        $('.flag_shop_list .lists').eq(num).addClass('active3').siblings().removeClass('active3')
        $('.flag_shop .current_page').text(num + 1)
    });
    // 数据渲染
    //     let arr = [];
    //     $('.flag_shops_list').find('.data-cell-box').each(function () {
    //         let data = [];
    //         $(this).find('.data-cell').each(function () {
    //             let o = {};
    //             o.src = $(this).find('img').attr('src');
    //             o.shopName = $(this).find('.item-shop-name').text();
    //             o.addr = $(this).find('.item-shop-position').text();
    //             data.push(o);
    //         });
    //         arr.push(data);
    //     });
    //    JSON.stringify(arr);
    let flagHtml = flagData.map(function (val, index) {
        let str = val.map(function (val1, index1) {
            return ` <div class="itemShop fl">
                            <a href="./04.list page.html">
                                <img src="${val1.src}" alt="">
                                <div class="itemShop_desc">
                                    <p>${val1.shopName}</p>
                                    <p>${val1.addr}</p>
                                </div>
                            </a>
                      </div>`
        }).join('');
        return ` <div class="flag_shop_list2 lists ${index == 0 ? 'active3' : ''}">${str}</div>`
    }).join('');
    $('.flag_shop_list').html(flagHtml);

    // 热门商品的功能及数据渲染
    let num1 = 0;
    $('.hot_shop').find('.hot_shop_next').unbind('click').click(() => {
        num1 = $('.hot_shop').find('.active4').index();
        num1++;
        console.log(num1);
        if (num1 > 1) {
            num1 = 1;
            return
        };
        $('.hot_shop_lists .hot_shop_list').eq(num1).addClass('active4').siblings().removeClass('active4')
        $('.hot_shop .current_page').text(num1 + 1);
    });
    // 上一张
    $('.hot_shop .hot_shop_prev').click(() => {
        num1--;
        if (num1 < 0) {
            return
        };
        $('.hot_shop_lists .hot_shop_list').eq(num1).addClass('active4').siblings().removeClass('active4')
        $('.hot_shop .current_page').text(num1 + 1)
    });
    // let a = [];
    // $('.hot_goods').find('.data-split').each(function () {
    //     let data = [];
    //     $(this).find('.item').each(function () {
    //         let o = {};
    //         o.srcshow = $(this).find('.li').eq(0).find('img').attr('src');
    //         o.srchide = $(this).find('.li').eq(1).find('img').attr('src');
    //         o.price = $(this).find('.price').text();
    //         o.shopName = $(this).find('.name').attr('title');
    //         data.push(o);
    //     });
    //     a.push(data);
    // });
    // JSON.stringify(a);
    let hot_shopHtml = hot_shop.map(function (val, index) {
        let str = val.map(function (val1, index1) {
            return `  <div class="hot_shop_item fl">
                            <div class="hot_shopPic">
                                    <img src="${val1.srcshow}" alt="" class="pic imgshow">
                                    <img src="${val1.srchide}" alt="">
                            </div>
                            <div class="hot_shopdesc">
                                <span class="price fl">${val1.price}</span><span class="hot_shop_name fr">${val1.shopName}</span>
                            </div>
                        </div>`
        }).join('');
        return ` <div class="hot_shop_list ${index == 0 ? 'active4' : ''}">${str}</div>`
    }).join('');
    $('.hot_shop_lists').html(hot_shopHtml);
    $('.hot_shop_lists').on('mouseenter', '.hot_shopPic', function () {
        $(this).find('.pic').next().addClass('imgshow').siblings().removeClass('imgshow');
    }).on('mouseleave', '.hot_shopPic', function () {
        $(this).find('.pic').addClass('imgshow').siblings().removeClass('imgshow');
    });
    $('.hot_shop_lists').on('click', '.hot_shopPic img', function () {
        let price = $(this).parents('.hot_shopPic').next().find('.price').text().slice(1) * 1;
        let title = $(this).parents('.hot_shopPic').next().find('.hot_shop_name').text();
        // console.log($(this), 'bababba', title);
        location.href = `./05.details.html?src=${$(this).attr('src')}&price=${price}&title=${title}`;

    });
    // 精选店铺部分，渲染+功能，鼠标移入切换图片
    let indexShopHtml = index_shop.map(function (val, index) {
        return `<div class="item fl">
                    <img src="${val.imgshow}" alt="" class="pic imgshow">
                    <img src="${val.imghide}" alt="">
                </div>`
    }).join('');
    $('.index_shops_list').html(indexShopHtml);
    $('.index_shops').on('mouseenter', '.item', function () {
        $(this).find('.pic').next().addClass('imgshow').siblings().removeClass('imgshow');
    }).on('mouseleave', '.item', function () {
        $(this).find('.pic').addClass('imgshow').siblings().removeClass('imgshow');
    });
    // let a1 = [];
    // $('.index_shops_list').find('.item').each(function () {
    //     let o = {};
    //     o.imgshow = $(this).find('.noslide').eq(0).find('img').attr('src');
    //     o.imghide = $(this).find('.noslide').eq(1).find('img').attr('src');
    //     a1.push(o);
    // });



});
