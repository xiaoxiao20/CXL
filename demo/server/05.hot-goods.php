<?php
$db=mysqli_connect('127.0.0.1','root','','demo');
$sql="SELECT * FROM hotgoods LIMIT 0,10";
$result=mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);
?>