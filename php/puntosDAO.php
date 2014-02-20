<?php

include_once 'conec.php'; // Incluimos nuestra coneccion a la base de datos

class puntosDAO
{
    private $r;
    
    public function __construct()
    {
        $this->r = array();
    }
    
    public function grabar($titulo, $cx, $cy) // Método para grabar en la base de datos
    {
        $con = conec::con();
        $titulo = mysql_real_escape_string($titulo);
        $cx = mysql_real_escape_string($cx);
        $cy = mysql_real_escape_string($cy);
        $q = "insert into mapas (Titulo, cx, cy)".
             "values ('".addslashes($titulo)."','".addslashes($cx)."','".addslashes($cy)."')";
        $rpta = mysql_query($q, $con);
        
        if($rpta)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    
    public function listarTodo() // Método para listar el contenido de la base de datos
    {
        
        $q = "select * from mapas";
        $con = conec::con();
        $rpta = mysql_query($q, $con);
        
        while ($fila = mysql_fetch_assoc($rpta)){
            $this->r[] = $fila;
        }
        
        return $this->r;
    }
    public function borrar($idPunto) // Método para borrar registros de la base de datos por medio del id
    {

       $con = conec::con();
       $idPunto = mysql_real_escape_string($idPunto);
       $q = "delete from mapas where IdPunto = ". (int)$idPunto;
       $rpta = mysql_query($q, $con);
       mysql_close($con);

       if($rpta == 1){
           return true;
       }
       else
       {
           return false;
       }
    }
    public function actualizar($titulo, $cx, $cy) // Método para actualizar en la base de datos
    {
        $con = conec::con();
        $titulo = mysql_real_escape_string($titulo);
        $cx = mysql_real_escape_string($cx);
        $cy = mysql_real_escape_string($cy);
        $q = "update mapas set Titulo=".$titulo." where IdPunto=".(int)$idPunto;
        $rpta = mysql_query($q, $con);
        
        if($rpta)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
