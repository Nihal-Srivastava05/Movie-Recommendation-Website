<!DOCTYPE html>
<html lang="en">
<head>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="reg.css">
  <title>Registration Page</title>
</head>

<body>
    
    
    <div class="main">
        <p class="sign" align="center">Registration</p>
        <form action="registration.php" method="post" class="form1">
        <input class="un " type="text" align="center" name="firstname" id="firstname" placeholder="Firstname">
        <input class="un " type="text" align="center" name="lastname" id="lastname" placeholder="Lastname">
        <input class="un" type="email" name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30" placeholder="Email" required>
        <input class= "un" type="text" name="phonenumber" placeholder="10 digit phone number">
        <input class="pass" type="password" align="center" name="password" placeholder="Password">
        
        <input class ="submit" type="submit" name="create" value="Register"><br><br>
                             
    </div>
     
</body>

</html>

<?php


include('config.php');  

if(isset($_POST['create']))
{
    $firstname = $_POST['firstname'];
    $lastname= $_POST['lastname'];
    $email = $_POST['email'];
    $phonenumber = $_POST['phonenumber'];
    $password = $_POST['password'];
    
    $sql = "INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUES('$firstname','$lastname','$email','$phonenumber','$password')";
    
    if(mysqli_query($con,$sql))
    {
        echo "<h1>User Created</h1>";
    }
}

?>