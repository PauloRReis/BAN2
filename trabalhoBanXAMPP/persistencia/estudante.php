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
    //$sql = "SELECT * FROM $d1.estudante";
    $sql = "SELECT $d1.e.nro_matricula, $d1.e.nome , $d1.e.idade, $d1.c.nome AS cod_curso, $d1.p_supervisor.nome AS professor_supervisor, $d1.p_conselheiro.nome AS estudante_conselheiro FROM $d1.estudante e JOIN $d1.curso c ON $d1.e.cod_curso = $d1.c.cod_curso JOIN $d1.professor p_supervisor ON $d1.e.prof_supervisor = $d1.p_supervisor.nro_matricula LEFT JOIN $d1.estudante p_conselheiro ON $d1.e.estudante_conselheiro = $d1.p_conselheiro.nro_matricula; ";
    $r1 = $localhost->query($sql);
    $res = array();
    while($row = $r1->fetch_array()){
        $rs = array($row[0], $row[1], $row[2], $row[3], $row[4], $row[5]);
        $res["".$row[0]] = $rs;
    }
    $localhost->close();
    $json = json_encode($res);
    die($json);
}elseif($_POST["op"] == "1"){ //INSERT
    $d = explode("^", $_POST["dados"]);
    $sql = "INSERT INTO $d1.estudante(nome, idade, cod_curso, prof_supervisor, estudante_conselheiro) VALUES('".$d[0]."',".$d[1].", ".$d[2].", ".$d[3].", ".$d[4].")";
    $localhost->query($sql);

    $r1 = $localhost->query("SELECT LAST_INSERT_ID()");
    $r = $r1 -> fetch_array();
    $idINS = $r[0];
    $localhost->close();

    die($idINS."^".$d[0]."^".$d[1]."^".$d[2]."^".$d[3]."^".$d[4]);
}elseif($_POST["op"] == "2"){ //UPDATE
    $d = explode("^", $_POST["dados"]);

    $ac = ($d[2] != "") ? "aconselhador=".$d[2]."" : "";

    $sql = "UPDATE $d1.estudante SET nome='".$d[1]."', idade=".$d[2]." WHERE nro_matricula =".$_POST['m'];
    $localhost->query($sql);
}

$localhost->close();
?>