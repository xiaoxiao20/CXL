$(() => {
    // 002---左侧二级导航
    $.getJSON('../lib/05.erji.json', function (data) {
        // console.log(data);
        // 01--拼接左边栏
        let strA = data[0].map(function (val, index) {
            let html1 = val.memu.map(function (value, key) {
                return `<a href='../html/04.list page.html'>${value}</a>`
            }).join('');
            return ` <li>
                <p>${val.title}</p>${html1}
            </li>`
        }).join('');
        // console.log(strA)
        $(strA).insertBefore($('.erji-rg'));

        (strA);
        // 02--拼接右边栏
        let strB = data[1].map(function (val, index) {
            let html = val.title1.map(function (val, key) {
                return `<p>${val}</p>`
            }).join('');
            let html1 = val.memu2.map(function (val2, value) {
                let html2 = val2.map(function (val3, num) {
                    return ` <a>${val3}</a>`
                }).join('');
                return `<li class="fl">${html2}</li>`
            }).join('');
            return ` 
        <div class="appendDiv">
        <ul class="fl ul-rg">
        <div class='ulTitle'>${html}</div>${html1} 
         </ul>
        <div class="erji-img fr">
            <img src="${val.src}" alt="">
         </div>
        </div>`
        }).join('');
        $('.erji-rg').append(strB);
    });

    $('.ban-left .erji-lf').on('mouseenter', 'li', function () {
        $(this).mouseenter(function () {
            let num = $(this).index();
            // console.log(num);
            $('.erji-rg').eq(num).stop().animate({
                'width': '800px'
            }, 800);
            // console.log($('.erji-rg').eq(num));
        }).mouseleave(function () {
            let num = $(this).index();
            $('.erji-rg').eq(num).stop().animate({
                'width': '0'
            }, 800);
        });
    })

})