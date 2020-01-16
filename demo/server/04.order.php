<?php
// 根据点击的页数和选择的排序方式进行数据的挑选渲染
$db=mysqli_connect('127.0.0.1','root','','demo');
mysqli_query($db,"SET NAMES UTF8");
// 根据传过来的参数page进行返回数据库的对应数据
$page=$_REQUEST['page'];
$start=($page - 1 ) * 80;

// 根据选择的排序方式，在数据库根据price对数据进行排序返回
$type=$_REQUEST['type'];
if($type=='default'){
    $sql="SELECT * FROM listpage LIMIT $start,80";
}elseif($type=='dsc'){
    $sql = "SELECT  * FROM listpage ORDER BY price DESC LIMIT $start,80";
}
elseif($type=='asc'){
$sql="SELECT  * FROM listpage ORDER BY price ASC LIMIT $start,80";
};

$result=mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
// print_r($data);
echo json_encode($data,true);
?>