<?php
    require 'vendor/autoload.php';

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
    $collection = $localhost->curso;

    $d1 = 'universidade';
    if($_POST['op'] == "0"){ //SELECT
        $cursor = $collection->find([]);
        $res = array();
        foreach ($cursor as $doc) {
    
            $id = $doc["_id"];
            $nome = $doc["nome"];
            $departamento = $localhost->$departamento->findOne(['_id' => $doc["nro_departamento"]]);
            //$departamento = $doc["nro_departamento"];
            
            $rs = array("".$id, $nome, (string) $departamento);
            $res["".$id] = $rs;
            
        }
    
        $json = json_encode($res);
        die($json);

    }elseif($_POST["op"] == "1"){ //INSERT
        $d = explode("^", $_POST['dados']);
    
        $dados = ['nome' => $d[0], 'nro_departamento' => new MongoDB\BSON\ObjectID($d[1])];

        $result = $collection->insertOne($dados);

        die($result->getInsertedId()."^".$d[0]."^".$d[1]);

    }elseif($_POST["op"] == "2"){ //UPDATE
        $d = explode("^", $_POST['dados']);

        $dados = [ 'nome' => $d[0]];

        //$collection->updateOne(['_id'=> new MongoDB\BSON\ObjectID($_POST['m']) ],[ '$set' => $dados]);
    }

    $localhost->close();
?>