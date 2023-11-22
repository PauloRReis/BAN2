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
        $ori = isset($doc["aconselhador"]) ? $doc["aconselhador"]."" : "NULL";
        
        $cursor2 = $localhost->turma->find(['_id' => $doc["cd_turma"]]);
        $turma = ""; 
        foreach ($cursor2 as  $doc2){
            $turma = $doc2['ano']."/".$doc2['semestre'];
        }

        $rs = array("".$id, $nome, $idade, $ori, $turma);
        $res["".$id] = $rs;
        
    }
    
    $json = json_encode($res);
    die($json);

}elseif($_POST["op"] == "1"){ //INSERT
    $d = explode("^", $_POST['dados']);

    $dados = ['nome' => $d[0], 'idade' => $d[1], 'cd_turma' => new MongoDB\BSON\ObjectID($d[2])];

    if($d[3]!=""){
        $dados['aconselhador'] = $d[3];
    }
    $result = $collection->insertOne($dados);

    die($result->getInsertedId()."^".$d[0]."^".$d[1]."^".$d[3]."^".$d[2]);

}elseif($_POST["op"] == "2"){ //UPDATE
    $d = explode("^", $_POST['dados']);

    $dados = [ 'nome' => $d[0], 'idade' => $d[1]];

    //$collection->updateOne(['_id'=> new MongoDB\BSON\ObjectID($_POST['m']) ],[ '$set' => $dados]);
}

$localhost->close();
?>