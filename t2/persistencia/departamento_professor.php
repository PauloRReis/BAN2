<?php
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 3500);
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if(!isset($_POST['op'])){
    die("Acesso Não Autorizado!");
}

header("Access-Control-Allow-Origin: *"); 
include("conexao.php");
$localhost = conectar();
$collection = $localhost->departamento_professor;

if($_POST['op'] == "1"){ /* INSERT */
    $dados = ['nr_matricula' => new MongoDB\BSON\ObjectID($_POST["codP"]), 'nr_depart' => new MongoDB\BSON\ObjectID($_POST["cod"])];            
    $result = $collection->insertOne($dados);     
}

$cursor = $collection->find(['nr_depart' => new MongoDB\BSON\ObjectID($_POST['cod'])]); 

$res = array();
foreach ($cursor as $doc) {

    $id = $doc["nr_matricula"];

    $res[] =['_id' => $id];
    
}
$res2 = array();

if($res != []){
    $cursor = $localhost->professor->find(['$or' => $res]);   
    
    foreach ($cursor as $doc) {
        $id = $doc["_id"];
        $nome = $doc["nome"];
    
        $rs = array("".$id, $nome);
        $res2["".$id] = $rs;    
    }
}


$json = json_encode($res2);
die($json);

?>