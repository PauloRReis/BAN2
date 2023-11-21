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

function console_log($output, $with_script_tags = true) {
    $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) .
    ');';
    if ($with_script_tags) {
    $js_code = '<script>' . $js_code . '</script>';
    }
    echo $js_code;
}

if($_POST['op'] == "0"){ // SELECT
    //$sql = "SELECT * FROM $d1.professor";
    $sql = "SELECT $d1.p.nro_matricula, $d1.p.nome, $d1.p.idade, $d1.p.sala, $d1.p.especialidade_pesquisa, $d1.d.nome AS prof_departamento FROM $d1.professor p JOIN $d1.departamento d ON $d1.p.prof_departamento = $d1.d.nro_departamento";
    $r1 = $localhost->query($sql);
    $res = array();
    while ($r = $r1->fetch_array()){
        $rs = array($r[0], $r[1], $r[2], $r[3], $r[4], $r[5]);
        $res["".$r[0]] = $rs;
    }  

    $localhost->close();
    $json = json_encode($res);
    die($json);

}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);
    $sql = "INSERT INTO $d1.professor(nome, idade, sala, especialidade_pesquisa, prof_departamento) VALUES('".$d[0]."', ".$d[1].", '".$d[2]."',  '".$d[3]."', ".$d[4].")";

    $localhost->query($sql);

    //Pega o ID do ultimo registro
    $r1 = $localhost->query("SELECT LAST_INSERT_ID()");
    $r = $r1->fetch_array();
    $idINS = $r[0];
    $localhost->close();
    die($idINS."^".$d[0]."^".$d[1]."^".$d[2]."^".$d[3]."^".$d[4]);

}else if($_POST['op'] == "2"){ /* UPDADE */
    $d = explode("^", $_POST['dados']);
    $sql = "UPDATE $d1.professor SET nome='".$d[1]."',idade=".$d[2].", sala='".$d[3]."', especialidade_pesquisa = '".$d[4]."' WHERE professor.nro_matricula =".$_POST['m'];
    $localhost->query($sql);
}

$localhost->close();


?>