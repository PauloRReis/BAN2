<?php

    function conectar(){

        $hostname_localhost = "localhost";
        $username_localhost = "root";
        $password_localhost = "";
        $database_localhost = "universidade";

        $localhost = new mysqli($hostname_localhost, $username_localhost, $password_localhost, $database_localhost);

        if(mysqli_connect_errno()){
            printf("Erro na conexão com o banco de dados: %s\n", mysqli_connect_error());
            exit();
        }
        return $localhost;
    }

?>