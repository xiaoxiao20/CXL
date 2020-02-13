<?php
$db = mysqli_connect("127.0.0.1", "root", "", "demo");
mysqli_query($db,"SET NAMES UTF8");
$type = $_REQUEST["type"];
$user_id = $_REQUEST["user_id"];

//1,查询购物车的信息----- type=get&user_id=xxx
// 查询会得到两个表的所有数据，并一起返回
// 要求用户是登录状态，如果当前用户没有登录那么在加入购物车的时候应该先登录。
if($type == "get"){
    $sql = "SELECT cart.*,listpage.* FROM cart , listpage WHERE cart.goods_id = listpage.id AND cart.user_id=$user_id";
    $result = mysqli_query($db,$sql);
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($data,true);
  }
// 2.加入购物车功能-----type=add&goods_id=${goods_id}&user_id=${user_id}
elseif($type=="add"){
$goods_id=$_REQUEST["goods_id"];
// 检查购物车数据库表之前是否有该商品，有则使数量加1，无则插入该商品的信息
$sql = "SELECT * FROM cart WHERE goods_id = $goods_id AND user_id=$user_id";
$result=mysqli_query($db,$sql);
if(mysqli_num_rows($result)==0){
  // 表示没有该商品信息，向里面添加信息
  $sql = "INSERT INTO `cart` (`cart_id`,`user_id`, `goods_id`, `num`) VALUES (NULL, $user_id,$goods_id, 1)";

}
else{
  // 更新crt表num值，加1
  $sql = "UPDATE `cart` SET `num`= `num`+ 1 WHERE `goods_id`=$goods_id AND user_id=$user_id";
};
$res=mysqli_query($db,$sql);
echo json_encode(array("status" => "success"));
}

// 3---更新购物车数量，显示---type=getCount&user_id=${user_id}
elseif($type=="getCount"){
  $sql = "SELECT * FROM cart WHERE user_id=$user_id";
  $result = mysqli_query($db, $sql);
  $data = mysqli_fetch_all(mysqli_query($db, $sql), MYSQLI_ASSOC);
  $total = 0;
  for ($i = 0; $i < count($data); $i++) {
    $total += $data[$i]["num"];
  }
  echo json_encode(array("status" => "success", "count" => $total), true);
}
// 4---删除购物车某个商品信息
elseif($type=="delete"){
  $goods_id = $_REQUEST["goods_id"];
  $sql = "DELETE FROM `cart` WHERE goods_id = $goods_id AND user_id = $user_id";
  mysqli_query($db, $sql);
  echo json_encode(array("status" => "success"), true);
}
// 5---点击进行加减
elseif($type == "upDateNum"){
  $goods_id = $_REQUEST["goods_id"];
  $count = $_REQUEST["count"];
  $sql = "SELECT cart.*,listpage.* FROM cart , listpage WHERE cart.goods_id = listpage.id AND cart.user_id=$user_id";
  $result = mysqli_query($db,$sql);
  $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
  $price = $data[0]["price"];
  $plusSql = "UPDATE `cart` SET `num`= $count WHERE `goods_id`=$goods_id AND user_id=$user_id";
  mysqli_query($db, $plusSql);
  echo json_encode(array("status" => "success","price"=>$price), true);
}
// 详情页点击加入购物车
elseif($type="addmore"){
  $goods_id=$_REQUEST["goods_id"];
  $more=$_REQUEST["more"];
  // 检查购物车数据库表之前是否有该商品，有则使数量加more，无则插入该商品的信息
  $sql = "SELECT * FROM cart WHERE goods_id = $goods_id AND user_id=$user_id";
  $result=mysqli_query($db,$sql);
  if(mysqli_num_rows($result)==0){
    // 表示没有该商品信息，向里面添加信息
    $sql = "INSERT INTO `cart` (`cart_id`,`user_id`, `goods_id`, `num`) VALUES (NULL, $user_id,$goods_id, $more)";
  
  }
  else{
    // 更新crt表num值，加more
    $sql = "UPDATE `cart` SET `num`= `num`+ $more WHERE `goods_id`=$goods_id AND user_id=$user_id";
  };
  $res=mysqli_query($db,$sql);
  echo json_encode(array("status" => "success"));
}
?>