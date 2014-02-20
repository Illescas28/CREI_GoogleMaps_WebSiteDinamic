<?php
# Agregar un retardo de 2 segundos para poder apreciar los mensajes
sleep(2);

header('content-type: application/json; charset=utf8'); // Cabecera para JSon
include_once '../php/puntosDAO.php';

$ac = isset($_POST['tipo']) ? $_POST['tipo'] : "x"; // Si el valor "tipo" tiene un valor entonces que ese valor sea el mismo de "tipo", de lo contrario, le insertamos "x" por defecto.

switch ($ac){
    case "grabar":
    
        $p = new puntosDAO(); // Instanciamos la clase puntosDAO
        $exito = $p->grabar($_POST['titulo'], $_POST['cx'], $_POST['cy']);
        if($exito)
        {
            $r['estado'] = "ok";
            $r['mensaje'] = "Grabado Correctamente";
        }
        else
        {
            $r['estado'] = "error";
            $r['mensaje'] = "error al grabar";
        }      
    break;
    case "listar":
    
        $p = new puntosDAO(); // Instanciamos la clase puntosDAO
        $resultados = $p->listarTodo();
        if(sizeof($resultados)>0)
        {
            $r['estado'] = "ok";
            $r['mensaje'] = $resultados;
        }
        else
        {
            $r['estado'] = "error";
            $r['mensaje'] = "datos no válidos";
        }      
    break;
    case "borrar":
    
        $p = new puntosDAO(); // Instanciamos la clase puntosDAO
        $resultados = $p->borrar($_POST['id']);
        if($resultados)
        {
            $r['estado'] = "ok";
            $r['mensaje'] = "Borrado Correctamente";
        }
        else
        {
            $r['estado'] = "error";
            $r['mensaje'] = "Error al actualizar";
        }      
    break;
    case "actualizar":
    
        $p = new puntosDAO(); // Instanciamos la clase puntosDAO
        $exito = $p->grabar($_POST['titulo'], $_POST['cx'], $_POST['cy']);
        if($exito)
        {
            $r['estado'] = "ok";
            $r['mensaje'] = "Actualizado Correctamente";
        }
        else
        {
            $r['estado'] = "error";
            $r['mensaje'] = "error al grabar";
        }      
    break;
    default :
        $r["estado"] = "error";
        $r["mensaje"] = "datos no válidos";
}

echo json_encode($r); // Imprime los resultados de JSon