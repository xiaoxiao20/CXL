<?php
$db1=mysqli_connect('127.0.0.1','root','','demo');
$sql1="SELECT * FROM hotgoods LIMIT 10,20";
$result1=mysqli_query($db1,$sql1);
$data1 = mysqli_fetch_all($result1,MYSQLI_ASSOC);
echo json_encode($data1,true)
?>