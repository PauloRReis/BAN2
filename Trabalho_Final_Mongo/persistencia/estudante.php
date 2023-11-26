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
$collection = $localhost->estudante;


if($_POST['op'] == "0"){ //SELECT
    $cursor = $collection->find([]);
    $res = array();
    foreach ($cursor as $doc) {

        $id = $doc["_id"];
        $nome = $doc["nome"];
        $idade = $doc["idade"];
        $cod_curso = $localhost->curso->findOne(['_id' => $doc["cod_curso"]], ['projection' => ['nome' => 1]])['nome'];
        $prof_supervisor = $localhost->professor->findOne(['_id' => $doc["prof_supervisor"]], ['projection' => ['nome' => 1]])['nome'];
        $ori = $doc["estudante_conselheiro"];


        $rs = array("".$id, $nome, $idade, (string) $cod_curso, (string) $prof_supervisor, (string) $ori);
        $res["".$id] = $rs;
        
    }
    
    $json = json_encode($res);
    die($json);

}elseif($_POST["op"] == "1"){ //INSERT
    $d = explode("^", $_POST['dados']);

    $dados = ['nome' => $d[0], 'idade' => $d[1], 'cod_curso' => new MongoDB\BSON\ObjectID($d[2]), 'prof_supervisor' => new MongoDB\BSON\ObjectID($d[3]), 'estudante_conselheiro' => new MongoDB\BSON\ObjectID($d[4])];

    die($result->getInsertedId()."^".$d[0]."^".$d[1]."^".$d[2]."^".$d[3]."^".$d[4]);

}elseif($_POST["op"] == "2"){ //UPDATE
    //$d = explode("^", $_POST['dados']);

    //$dados = [ 'nome' => $d[0], 'idade' => $d[1]];

    //$collection->updateOne(['_id'=> new MongoDB\BSON\ObjectID($_POST['m']) ],[ '$set' => $dados]);
}

$localhost->close();
?>