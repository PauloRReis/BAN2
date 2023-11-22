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
            
            $rs = array("".$id, $nome);
            $res["".$id] = $rs;
            
        }
    
        $json = json_encode($res);
        die($json);

    }elseif($_POST["op"] == "1"){ //INSERT
        $d = explode("^", $_POST['dados']);
    
        $dados = ['nome' => $d[0]];

        $result = $collection->insertOne($dados);
    
        $id_curso = $result->getInsertedId();

        $result2 = $localhost->departamento_curso->insertOne(['cd_curso' => new MongoDB\BSON\ObjectID($id_curso), 'nr_depart' => new MongoDB\BSON\ObjectID($d[1])]);

        die($id_curso."^".$d[0]);

    }elseif($_POST["op"] == "2"){ //UPDATE
        $d = explode("^", $_POST['dados']);

        $dados = [ 'nome' => $d[0]];

        //$collection->updateOne(['_id'=> new MongoDB\BSON\ObjectID($_POST['m']) ],[ '$set' => $dados]);
    }

    $localhost->close();
?>