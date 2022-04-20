<?php
    session_start();
    include('config.php');
    $movieID = $_POST['movieID'];
    $userID = $_SESSION['userID'];

    $sql = "INSERT INTO wishlist (id, movieID) VALUES('$userID','$movieID')";
    if(mysqli_query($con, $sql))
    {
        echo '<script type="text/javascript">';
        echo 'alert("Successfully added to wishlist.")';
        echo '</script>';
        header("location: ./..#");
    }
?>