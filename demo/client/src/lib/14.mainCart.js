$(() => {

    // 检查用户是否登录
    let phone = Cookie.getItem("phone");
    let user_id = Cookie.getItem("user_id");
    if (phone && user_id) {
        $(".header-load .main1 .login .login-status").text("您好: SKW" + phone.slice(0, 8));
        $('.header-load .main1 .login .reg-status').text('退出');
        getGoodsNums();
        getCartData();
    };
    //001--- getCartData---获取对应的数据，并进行渲染
    function getCartData() {
        /* 接口：cart.php?type=get&user_id=xxx*/
        $.ajax({
            type: "get",
            url: "../../../server/08.mainCart.php",
            data: `type=get&user_id=${user_id}`,
            dataType: "json",
            success: function (data) {
                console.log(data);
                /* 整理前[{商品},{商品},{}] */
                /* 需要对数据进行处理(把数据按照店铺名称来整理) */
                /* 整理后[{店铺},{店铺},{}] */
                let storeNames = [];
                let storeData = [];
                data.forEach(ele => {
                    if (!storeNames.includes(ele.shopName)) storeNames.push(ele.shopName);
                });

                storeNames.forEach(ele => {
                    storeData.push({ "shopName": ele, "goods": [] })
                });

                data.forEach(ele => {
                    let currentStoreName = ele.shopName;
                    storeData.forEach(item => {
                        if (item.shopName == currentStoreName) {
                            item.goods.push(ele);
                        }
                    })
                });
                cartRenderUI(storeData);
            }
        });
    };
    /* 购物车数据内容渲染 */
    function cartRenderUI(_data) {
        console.log(_data);
        /* 创建标签 */
        let html = _data.map(ele => {

            let tpl = ele.goods.map(ele => {
                let total = ele.num * ele.price;
                return `
                    <div class="shopsDetails" data-item-id="${ele.goods_id}">
                        <input class="fl check1" type="checkbox" name="">
                        <div class="desc-pic fl">
                            <img src="${ele.src}" alt="">
                        </div>
                        <div class="desc fl">
                            <div class="desc-title fl">
                                <p class="storemsg">${ele.title}</p>
                                <span class="sales">${ele.sales}</span>
                            </div>
                            <div class="size fl">
                                <span>尺码：</span><span>均码</span>
                            </div>
                            <div class="addr fl">地址:${ele.adr}</div>

                        </div>
                        <div class="select-delete fl">
                            <input type="checkbox" name="" class="sel-delete">
                        </div>
                        <div class="count fl">
                            <input class="cut" type="button" value="-">
                            <input class="total" type="text" value="${ele.num}">
                            <input class="add" type="button" value="+">
                        </div>
                        <div class="itemPrice fl">￥${ele.price}.00</div>
                        <div class="cost fl">￥${total}.00</div>
                        <div class="operation fl">
                            <span class="move">删除</span>
                            <span>移入收藏夹</span>
                        </div>
                    </div>
                        `
            }).join("");
            return `<li class="list">
                        <div class="store-box">
                            <div class="store-name">
                                <div class="fl">
                                    <input type="checkbox" name="" class="store-btn">
                                    <span class="storeName">${ele.shopName}</span>
                                </div>
                                <div class="store-price">￥0.00</div>
                            </div>
                        </div>
                        ${tpl}
                    </li>`
        }).join("");
        /* 设置标签 */
        $(".goodsLists").html(html);
        // 当购物车为空时，有消息提示
        let lists = $('.goodsLists').children();
        if (lists.length == 0) {
            $('.null-cart').show()
        } else {
            $('.null-cart').hide();
        };
    };
    // 002---点击删除购物车,根据goods_id删除数据库信息，再刷新渲染
    function deleteGoods(goods_id) {
        $.ajax({
            type: "get",
            url: "../../../server/08.mainCart.php",
            data: `type=delete&user_id=${user_id}&goods_id=${goods_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == 'success') {
                    getCartData();
                    getGoodsNums()
                }
            }
        });
    }
    $('.goodsLists').on('click', '.move', function () {
        console.log('deldedledl')
        let goods_id = $(this).parents('.shopsDetails').data('item-id');
        let res = confirm('主人，您确定不要我了吗~o(╥﹏╥)o')
        if (res) {
            deleteGoods(goods_id);
        } else {
            return;
        }
    });
    // 003---获取购物车中的数量，显示数量
    function getGoodsNums() {
        $.ajax({
            type: "get",
            url: "../../../server/08.mainCart.php",
            data: `type=getCount&user_id=${user_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == 'success') {
                    $('.shopping-content .itemNum').text(response.count);
                }
            }
        });
    };
    // 004---封装函数，根据商品的复选框的勾选状况，计算总商品数量和总价
    function sumTotalPriceAndNum() {
        let totalPrice = 0;
        let totalNum = 0;
        $('.goodsLists').find('.check1').each(function () {
            let isCheck = $(this).is(':checked');
            if (isCheck) {
                currtntPrice = $(this).parents('.shopsDetails').find('.cost').text().slice(1) * 1;
                currentNum = $(this).parents('.shopsDetails').find('.total').val() * 1;
                totalPrice += currtntPrice;
                totalNum += currentNum;
            };
            // console.log(totalNum, totalPrice, "222222")
            $('.content-top').find('.count .total').text(totalPrice.toFixed(2));
            $('.content-foot').find('.final').text(totalPrice.toFixed(2));
            $('.content-foot').find('.foot-num2').text(totalNum);
            $('.content-foot').find('.total-num').text(totalNum);
        })
    };
    // ********商品店铺复选框状态变化的时候，该店铺下的所有商品复选框状态一致
    $('.goodsLists').on('click', '.store-btn', function () {
        let all = $(this).parents('.list').find('.check1');
        let isCheck = $(this).is(':checked');
        all.prop('checked', isCheck);
        if ($(this).is(':checked')) {
            let store_price = 0;
            $(this).parents('.list').find('.cost').each(function () {
                current_price = $(this).text().slice(1) * 1;
                store_price += current_price
            });
            $(this).parents('.list').find('.store-price').text("￥" + store_price.toFixed(2));
        } else {
            $(this).parents('.list').find('.store-price').text("￥0.00");
        }
        let allStore = $('.goodsLists').find('.store-btn');
        let flag = allStore.toArray().every((ele) => {
            return $(ele).is(':checked') == true
        });
        $('.shopping-content').find(".checkbox1").prop('checked', flag);
        sumTotalPriceAndNum();
    });
    // ********全选功能
    $('.shopping-content').find(".checkbox1,#all").click(function () {
        let isCheck = $(this).is(':checked');
        $('.goodsLists').find("input[type='checkbox']:not(.sel-delete)").prop('checked', isCheck);
        if ($(this).is(':checked')) {
            $(this).parents('.itemShow').find('.list').each(function () {
                let store_price = 0;
                $(this).find('.cost').each(function () {
                    current_price = $(this).text().slice(1) * 1;
                    store_price += current_price
                });
                $(this).find('.store-price').text("￥" + store_price.toFixed(2));
            });
        } else {
            $(this).parents('.itemShow').find('.list').each(function () {
                $(this).find('.store-price').text("￥0.00");
            })

        }
        sumTotalPriceAndNum();
    });
    // 005---点击进行加减
    function upDateNum(ele, count) {
        let goods_id = ele.parents('.shopsDetails').data('item-id');
        $.ajax({
            type: "get",
            url: "../../../server/08.mainCart.php",
            data: `type=upDateNum&goods_id=${goods_id}&user_id=${user_id}&count=${count}`,
            dataType: "json",
            success: function (response) {
                if (response.status == 'success') {
                    ele.parents('.count').find('.total').val(count);
                    ele.parents('.count').parents('.shopsDetails').find('.cost').text("￥" + count * response.price + ".00");

                    let store_price = 0;
                    ele.parents('.list').find('.check1').each(function () {
                        if ($(this).is(':checked')) {
                            current_price = $(this).parents('.shopsDetails').find('.cost').text().slice(1) * 1;
                            store_price += current_price
                        }
                    });
                    ele.parents('.list').find('.store-price').text("￥" + store_price.toFixed(2));
                    getGoodsNums();
                    sumTotalPriceAndNum();
                }
            }
        });
    };
    $('.goodsLists').on('click', '.cut', function () {
        // 减
        let count = $(this).next().val() * 1;
        if (count == 1) return;
        upDateNum($(this), count - 1);
    });
    $('.goodsLists').on('click', '.add', function () {
        // 加
        let count = $(this).prev().val() * 1;
        console.log(count);
        upDateNum($(this), count + 1);
    });
    // 006---批量删除
    $('.content-foot').find('.sel-dele span').click(function () {
        let key = $('.goodsLists').find('.sel-delete').toArray().some(ele => {
            return $(ele).is(':checked') == true
        });
        if (key) {
            let res = confirm('您确定要移除这些商品吗？');
            if (res) {
                $('.goodsLists').find('.sel-delete').each(function () {
                    if ($(this).is(':checked')) {
                        let goods_id = $(this).parents('.shopsDetails').data('item-id');
                        deleteGoods(goods_id);
                    }
                })
            }
            else {
                return;
            }
        } else {
            alert('请选择需要移除的商品~');
        }

    });
    // 007---清空购物车
    $('.content-foot').find('.clear').click(function () {
        let key = confirm('您确定您要清空所有商品吗？？');
        if (key) {
            $('.goodsLists').find('.shopsDetails').each(function () {
                let goods_id = $(this).data('item-id');
                deleteGoods(goods_id);
            });
        } else return;
    });

    // *********商品的勾选情况
    /* 逻辑：当某个具体的商品勾选状态改变的时候，应该检查当前店铺中是否所有的商品都有被勾选 */
    /* 如果成立，那么就把把店铺勾上，否则就去掉 */
    $('.goodsLists').on('click', '.check1', function () {
        let all = $(this).parents('.list').find('.check1');
        // 该店铺下的每个商品都被勾选才返回
        let key = all.toArray().every((ele) => {
            return $(ele).is(':checked') == true
        });
        $(this).parents('.list').find('.store-btn').prop('checked', key);
        let allStore = $('.goodsLists').find('.store-btn');
        let flag = allStore.toArray().every((ele) => {
            return $(ele).is(':checked') == true
        });
        $('.shopping-content').find(".checkbox1").prop('checked', flag);
        let store_price = 0;
        $(this).parents('.list').find('.check1').each(function () {
            if ($(this).is(':checked')) {
                current_price = $(this).parents('.shopsDetails').find('.cost').text().slice(1) * 1;
                store_price += current_price
            }
        });
        $(this).parents('.list').find('.store-price').text("￥" + store_price.toFixed(2));
        //    设置档口数量
        let num = 0;
        $(this).parents('.goodsLists').find('.check1').each(function () {
            if ($(this).is(':checked')) {
                num++;
            };
        })
        $('.content-foot').find('.foot-num1').text(num);
        sumTotalPriceAndNum();
    });
})