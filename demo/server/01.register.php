<?php
// echo 'ok'


# 001--连接数据库
$db=mysqli_connect("127.0.0.1","root","","demo");
#002--获取客户端提交的参数
$_password=$_REQUEST["password"];
$_phoneNum=$_REQUEST["phone"];
#检查当前用户名是否存在,从表中查询
$sql = "SELECT * FROM register WHERE phone='$_phoneNum'";
$result=mysqli_query($db,$sql);
if(mysqli_num_rows($result)==0){
    #mysqli_num_rows($result)==1，表示该账户已存在
    // 该账户不存在，向数据库表中插入该行信息，并返回成功的信息
    $sql="INSERT INTO `register`(`id`,`phone`,`password`) VALUES (NULL,'$_phoneNum','$_password')";
    $result=mysqli_query($db,$sql);
    echo '{
        "status":"success",
        "msg":"恭喜您，注册成功"
    }';

}
else{
echo '{
    "status":"error",
    "msg":"抱歉，该用户名已存在，请直接登录"
}';
}

?>