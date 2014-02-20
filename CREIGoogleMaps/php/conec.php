<?php

class conec // Clase para conección a la base de datos
{
    public static function con()
    {
        $coneccion = mysql_connect("localhost", "root", "mysql");
        mysql_select_db("mapa");
        mysql_query("SET NAMES 'utf8'");
        if(!coneccion){
            return false;
        }
        else
        {
            return $coneccion;
        }
    }
}
