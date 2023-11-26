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
$collection = $localhost->projeto;

if($_POST['op'] == "0"){ // SELECT
    $cursor = $collection->find([]);
    $res = array();
    foreach ($cursor as $doc) {

        $dateI = explode("-", $doc["data_ini"]);
        $dateF = explode("-", $doc["data_fim"]);
        $dateI = $dateI[2]."/".$dateI[1]."/".$dateI[0];
        $dateF = $dateF[2]."/".$dateF[1]."/".$dateF[0];
        
        $id = $doc["_id"];
        $nome = $doc["nome"];
        $orgao = $doc["orgao_financiador"];        
        $orcamento = $doc["orcamento"];
        $pesquisador = $localhost->professor->findOne(['_id' => $doc["professor_pesquisador"]], ['projection' => ['nome' => 1]])['nome'];  
        
        $rs = array("".$id, $nome, $orgao, $dateI, $dateF, $orcamento, (string) $pesquisador);
        $res["".$id] = $rs;
        
    }

    $json = json_encode($res);
    die($json);

}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);

    $dateI = explode("/", $d[2]);
    $dateF = explode("/", $d[3]);
    $dateI = $dateI[2]."-".$dateI[1]."-".$dateI[0];
    $dateF = $dateF[2]."-".$dateF[1]."-".$dateF[0];

    $dados = ['nome' => $d[0], 'orgao_financiador' => $d[1], 'data_ini' => $dateI, 'data_fim' => $dateF, 'orcamento' => $d[4], 'professor_pesquisador' => new MongoDB\BSON\ObjectID($d[5])];        

    $result = $collection->insertOne($dados);

    die($result->getInsertedId()."^".$d[0]."^".$d[1]."^".$d[2]."^".$d[3]."^".$d[4]."^".$d[5]);

}else if($_POST['op'] == "2"){ /* UPDADE */
   
}

$localhost->close();

?>