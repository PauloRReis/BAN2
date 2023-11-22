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
$collection = $localhost->curso;

if($_POST['op'] == "0"){
   

    $cursor = $collection->find([]);
    $res = array();
    foreach ($cursor as $doc) {

        $id = $doc["_id"];
        $nome = $doc["nome"];
        
        $rs = array("".$id, $nome);
        $res["".$id] = $rs;
        
    }

    $json = json_encode($res);
    die($json);


}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);
    
    $dados = ['nome' => $d[0]];

    $result = $collection->insertOne($dados);
    
    $id_curso = $result->getInsertedId();

    $result2 = $localhost->departamento_curso->insertOne(['cd_curso' => new MongoDB\BSON\ObjectID($id_curso), 'nr_depart' => new MongoDB\BSON\ObjectID($d[1])]);

    die($id_curso."^".$d[0]);

}else if($_POST['op'] == "2"){ /* UPDADE */
    $d = explode("^", $_POST['dados']);

    $dados = [ 'nome' => $d[0]];

    $collection->updateOne(['_id'=> new MongoDB\BSON\ObjectID($_POST['m']) ],[ '$set' => $dados]);
}

$localhost->close();


?>