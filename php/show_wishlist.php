<?php
    include('config.php');
    $sql = "select * from wishlist;";
    $result = mysqli_query($con, $sql);
    $wishlist = array();
    while ($row = mysqli_fetch_array($result)) {
        // $movie = array($row['id'], $row['movieID']);
        array_push($wishlist, $row['movieID']);
    }
    
    echo json_encode($wishlist);
?>