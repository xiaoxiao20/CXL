<?php
// 获取数据库的数据总长度，计算分页的页数并返回
$db=mysqli_connect("127.0.0.1","root","","demo");
$sql="SELECT * FROM listpage";

$result=mysqli_query($db,$sql);
$num=mysqli_num_rows($result);//计算数据总长度

// 计算页数，每页80条数据
$count=ceil($num/80);
echo "{\"count\":$count}"
?>