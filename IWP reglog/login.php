<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
</head>

<body>

    <div>
        <form name="f1" action = "authentication.php" onsubmit = "return validation()" method = "POST">
            <div class="container"></div>
                <h1>Login</h1>
                <p>Fill up the form with correct values</p>

                <label for="email"><b>Email Address</b></label>
                <input type="email" name="email"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" size="30" required>
                <br>

                <label for="password"><b>Password</b></label>
                <input type="password" name="password" required>
                <br>
                
                <input type="submit" name="save" value="Login"><br><br>
            </div>      
        
        </form>
    </div>
</body>
</html>

