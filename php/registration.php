<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
</head>

<body>

    <div>
        <form action = "registration.php" method="post">
            <div class="container"></div>
                <h1>Registration</h1>
                <p>Fill up the form with correct values</p>
                
                <label for="firstname"><b>First Name</b></label>
                <input type="text" name="firstname" required>
                <br>

                <label for="lastname"><b>Last Name</b></label>
                <input type="text" name="lastname" required>
                <br>

                <label for="email"><b>Email Address</b></label>
                <input type="email" name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30" required>
                <br>

                <label for="phonenumber"><b>Phone Number</b></label>
                <input type="text" name="phonenumber">
                <br>

                <label for="password"><b>Password</b></label>
                <input type="password" name="password" required>
                <br>
                
                <input type="submit" name="create" value="Register"><br><br>
            </div>      
        
        </form>
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
        echo "User Created";
    }
}

?>