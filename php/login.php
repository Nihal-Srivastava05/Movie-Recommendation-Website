<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
    <link rel="stylesheet" href="log.css">
    
</head>

<body>
    <br><br>
    <div class="main">
        
        <p class="sign" align="center">Login</p>
        <form class="form1" name="f1" action="login.php" onsubmit = "return validation()" method = "post">
        <input class="un" type="email" name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30" placeholder="Email" required>
        <input class="pass" type="password" align="center" name="password" placeholder="Password">
        <input class ="submit" type="submit" name="save" value="Login"><br><br>                         
        
        </form>
    </div>
 
</body>
</html>

<?php      
    session_start();
    include('config.php');  
    $email = $_POST['email'];  
    $password = $_POST['password'];
    
    //to prevent from mysqli injection  
    $email = stripcslashes($email);  
    $password = stripcslashes($password);  
    $email = mysqli_real_escape_string($con, $email);  
    $password = mysqli_real_escape_string($con, $password);  
    
    $sql = "select * from users where email = '$email' and password = '$password'";  
    $result = mysqli_query($con, $sql);  
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
    $count = mysqli_num_rows($result);  
        
    if($count == 1){  
        echo "<h1><center> Login successful </center></h1>";  
        $sql_id = "select * from users where email = '$email' and password = '$password'";
        $result_id = mysqli_query($con, $sql);  
        // $row_id = mysqli_fetch_array($result); 
        while ($row_id = mysqli_fetch_array($result_id)) {
            $_SESSION["userID"] = $row_id['id'];
        }
    }  
    else{  
        echo "<h1> Login failed. Invalid email $email or password.</h1>";  
    }     

?> 


