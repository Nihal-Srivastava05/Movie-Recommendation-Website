<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Login</title>
    <link rel="stylesheet" href="login.scss">
    
</head>

<body>
    <link href="logincss.scss" rel="stylesheet/scss" type="text/css">
    
    <div class="container">
    <div class="message signup">
        <div class="btn-wrapper">
        <button class="button" id="signup">Sign Up</button>
        <button class="button" id="login"> Login</button>
        </div>
    </div>
    <div class="form form--signup">
        <div class="form--heading">Welcome! Sign Up</div>
        <form autocomplete="off">
        <input type="text" placeholder="Name">
        <input type="email" placeholder="Email">
        <input type="password" placeholder="Password">
        <button class="button">Sign Up</button>
        </form>
    </div>
    <div class="form form--login">
        <div class="form--heading">Welcome back! </div>
        <form autocomplete="off">
        <input type="text" placeholder="Name">
        <input type="password" placeholder="Password">
        <button class="button">Login</button>
        </form>
    </div>
    </div>
    <!-- <div>
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
    </div> -->
</body>
</html>




