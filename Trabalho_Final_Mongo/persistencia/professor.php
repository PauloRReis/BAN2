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
$collection = $localhost->professor;

if($_POST['op'] == "0"){ // SELECT
    $cursor = $collection->find([]);
    $res = array();
    foreach ($cursor as $doc) {

        $id = $doc["_id"];
        $nome = $doc["nome"];
        $idade = $doc["idade"];
        $sala = $doc["sala"];
        $espec = $doc["especialidade_pesquisa"];
        $prof_departamento = $doc["prof_departamento"];
        
        $rs = array("".$id, $nome, $idade, $sala, $espec, (string) $prof_departamento);
        $res["".$id] = $rs;
        
    }

    $json = json_encode($res);
    die($json);

}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);

    $dados = ['nome' => $d[0], 'idade' => $d[1], 'sala' => $d[2], 'especialidade_pesquisa' => $d[3], 'prof_departamento' => new MongoDB\BSON\ObjectID($d[4])];

    $result = $collection->insertOne($dados);

    die($result->getInsertedId()."^".$d[0]."^".$d[1]."^".$d[2]."^".$d[3]."^".$d[4]);

}else if($_POST['op'] == "2"){ /* UPDADE */
    $d = explode("^", $_POST['dados']);
    
    $dados = [ 'nome' => $d[0], 'idade' => $d[1], 'sala' => $d[2], 'especialidade' => $d[3]];

    //$collection->updateOne(['_id'=> new MongoDB\BSON\ObjectID($_POST['m']) ],[ '$set' => $dados]);

}

$localhost->close();


?>