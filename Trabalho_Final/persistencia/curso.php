<?php

    ini_set('memory_limit', '-1');
    ini_set('max_execution_time', 3500);
    error_reporting(E_ALL);
    ini_set('display_erros','On');

    if(!isset($_POST['op'])){
        die("Acesso não autorizado!!");
    }

    header("Access-Control-Allow-Origin: *");
    include("conexao.php");
    $localhost = conectar();

    $d1 = 'universidade';
    if($_POST['op'] == "0"){ //SELECT
        $sql = "SELECT * FROM '$d1'.curso";
        $r1 = $localhost->query($sql);
        $res = array();
        while($row = $r1->fetch_array()){
            $rs = array($row[0], $row[1]);
            $res["".$row[0]] = $rs;
        }
        $localhost->close();
        $json = json_encode($res);
        die($json);
    }elseif($_POST["op"] == "1"){ //INSERT
        $d = explode("^", $_POST["dados"]);
        $sql = "INSERT INTO '$d1'.curso(nome) VALUES('".$d[0]."')";
        $localhost->query($sql);

        $r1 = $localhost->query("SELECT LAST_INSERT_ID()");
        $r = $r1 -> fetch_array();
        $idINS = $r[0];

        $sql = "INSERT INTO '$d1'.departamento_curso(cd_curso, nr_departamento) VALUES(".$idINS.", ".$d[1].")";
        $localhost->query($sql);

        $localhost->close();
        die($idINS."^".$d[0]);
    }elseif($_POST["op"] == "2"){ //UPDATE
        $d = explode("^", $_POST["dados"]);
        $sql = "UPDATE '$d1'.curso SET nome='".$d[0]."' WHERE cd_curso =".$_POST['m'];
        $localhost->query($sql);
    }

    $localhost->close();
?>