<?php

// Database connection
$con = new mysqli('localhost','root','','v-project');

//Get value
if( isset($_GET['name']) && isset($_GET['email']) && isset($_GET['cell'])){
    $name = $_GET['name'];
    $email = $_GET['email'];
    $cell = $_GET['cell'];

    //data insert
    $sql = "INSERT INTO users (name, email, cell) VALUES ('$name', '$email', '$cell')";
    $con -> query($sql);
}

// Data Delete
if(isset($_GET['delete_id'])){
    $id = $_GET['delete_id'];
    $con -> query("DELETE FROM users WHERE id = '$id' " );
}


//Data show
$data = $con -> query("SELECT * FROM users ORDER by id DESC");
$all_users = [];
while($user = $data -> fetch_assoc()){
    array_push($all_users, $user);
};
echo json_encode($all_users);



