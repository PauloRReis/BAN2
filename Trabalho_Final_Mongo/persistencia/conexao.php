<?php
    require 'vendor/autoload.php';

    function conectar(){
        global $database_localhost;

        $localhost = new MongoDB\Client("mongodb://localhost:27017/");

        return $localhost->universidade;
    }
      
?>