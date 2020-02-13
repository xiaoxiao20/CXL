<?php
// 01--连接数据库
$db=mysqli_connect('127.0.0.1','root','','demo');
// 02--获取客户端的参数
$phone=$_REQUEST['phone'];
// 03--检查该手机号是否已经注册
$sql =  "SELECT * FROM register WHERE phone='$phone'";

// 04--根据检查的结果进行判断
$result=mysqli_query($db,$sql);
if(mysqli_num_rows($result)==0){
    // 该用户名不存在，需要去注册
    echo '{
        "status":"error",
        "msg":"该用户还没有注册，请前往注册"
    }';
}else{
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $id = $data[0]["id"];
    echo "{\"status\":\"success\",\"msg\":\"登录成功！！！\",\"id\":$id}";
}
?>