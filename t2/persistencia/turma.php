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
$collection = $localhost->turma;

if($_POST['op'] == "0"){
    
    $cursor = $collection->find([]);
    $res = array();
    foreach ($cursor as $doc) {

        $id = $doc["_id"];
        $ano = $doc["ano"];                
        $semestre = $doc["semestre"];
        
        $rs = array("".$id, $ano, $semestre);
        $res["".$id] = $rs;
        
    }

    $json = json_encode($res);
    die($json);

}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);

    $dados = ['ano' => $d[0], 'semestre' => $d[1]];

    $result = $collection->insertOne($dados);

    die($result->getInsertedId()."^".$d[0]."^".$d[1]);
}

$localhost->close();


?>