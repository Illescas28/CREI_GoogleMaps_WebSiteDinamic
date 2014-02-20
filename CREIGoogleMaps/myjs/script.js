$(document).on("ready", inicio); /* Evento "ready" cuando funcion "main" */

/*Cuando le demos clic a nuestro menú, que nos lleve a la seccion*/
function inicio(){
     /*Cuando le demos clic a menú, que nos lleve a la funcion "irA" */
    $("#menu a").on("click", irA);
    /* En nuestro css creamos 2 estilos nuevos (.logo2 para logo y .seleccionado para las demas secciones) para que cuando seleccionemos cada una de las secciones, se vallan iluminando */
    /* el objeto "window" controla el scroll */
    $(window).scroll(scrollMenu);
}

/*  En nuestro documento html, cada capa(div) tiene el mismo nombre que el nombre que le pusimos a nuestra direccion en el menu en las anclas "#"(href). sin jQueri, nos lleva a la seccion sin ningun tipo de animación. Animar es lo que aremos con esta función */
function irA(){
    /* Como cada link de nuestro documento html tiene el nombre de cada capa a la que queremos ir, vamos a crear una variable "seccion" que va a obtener ese atributo */
    var seccion = $(this).attr("href");
    /* Queremos mover el body el html y queremos animar el scroll. */
    $("body, html").animate({
       /* ScrollTop = es una funcuión de jQuery que nos permite decirle a la barra de desplasamiento la posición en la que queremos que se encuentre */
       /* $(seccion) = En donde este seccion, o sea, a la opcion en donde le piquemos. */
       /* offset() = nos permite obtener las cordenadas en pixeles de donde se encuentra exactamente esa capa */
       /* offset().top =  para saber desde donde empieza esa capa y nos va a obtene el número de pixeles y lo va a animar. O sea que va a desplazar la barra de desplasamiento hasta esos pixeles */
       scrollTop: $(seccion).offset().top-160
    /* 800 milisegundos (1000 milisegundos es un segundo*/   
    },800);
    
    /* Para que se corte en el momento en que nos lleva a la seccion para que mejr se vea el efecto */
    return false;
}

function scrollMenu(){
    var secciones = [$("#inicio").offset().top, $("#servicios").offset().top, $("#trabajo").offset().top, $("#faq").offset().top , $("#mapa").offset().top , $("#contacto").offset().top, $("#rutas").offset().top, $("body").height()];
    /* validacion de la pocicion de la barra de desplazamiento cuando este entre las secciones de inicio a servicios */
    if($(this).scrollTop() > secciones[0]-170 && $(this).scrollTop() < secciones[1]-170){
        /* Tomamos nuetro estilo ".logo2" de nuestro css*/
        /* Con la función eq() elejimos la pocición de donde se encuentre nuestro "li a" de nuestro "ul" de nuestro "div id=menu" en nuestro archiovo html - considerando que lo imaginemos como un arreglo, siendo asi, la posición "2" le corresponde a "#inicio" */
        /* A nuestro "menu a" le vamos a remover la "clase=logo2" con la función removeClass, porque nuestro logo ya tiene la clase puesta...*/
        $("#menu a").eq(3).removeClass("logo2");
    }else{
        /*...pero si no la tiene puesta, entonces se la añadimos con addClass el logo :D  */
        $("#menu a").eq(3).addClass("logo2");
    }
    /* validacion de la pocicion de la barra de desplazamiento cuando esté entre las secciones de servicios y trabajo */
    if($(this).scrollTop() > secciones[1]-170 && $(this).scrollTop() < secciones[2]-170){
        /* Tomamos nuestro estilo de "seleccionado de nuestro css */
        /*Recordemos que nuetsra posicion "0" es servicios en nuetsro "menu" html */
        $("#menu a").eq(0).addClass("seleccionado");
    }else{
        $("#menu a").eq(0).removeClass("seleccionado");
    }
    /* validacion de la pocicion de la barra de desplazamiento cuando esté entre las secciones de trabajo y faq */
    if($(this).scrollTop() > secciones[2]-170 && $(this).scrollTop() < secciones[3]-170){
        
        $("#menu a").eq(1).addClass("seleccionado");
    }else{
        $("#menu a").eq(1).removeClass("seleccionado");
    }
    /* validacion de la pocicion de la barra de desplazamiento cuando esté entre las secciones de faq y map */
    if($(this).scrollTop() > secciones[3]-170 && $(this).scrollTop() < secciones[4]-170){
        
        $("#menu a").eq(2).addClass("seleccionado");
    }else{
        $("#menu a").eq(2).removeClass("seleccionado");
    }
     /* validacion de la pocicion de la barra de desplazamiento cuando esté entre las secciones de map y contacto */
    if($(this).scrollTop() > secciones[4]-170 && $(this).scrollTop() < secciones[5]-170){
        
        $("#menu a").eq(4).addClass("seleccionado");
    }else{
        $("#menu a").eq(4).removeClass("seleccionado");
    }
    /* validacion de la pocicion de la barra de desplazamiento cuando esté entre las secciones de contacto y rutas */
    if($(this).scrollTop() > secciones[5]-170 && $(this).scrollTop() < secciones[6]-170){
        
        $("#menu a").eq(5).addClass("seleccionado");
    }else{
        $("#menu a").eq(5).removeClass("seleccionado");
    }
     /* validacion de la pocicion de la barra de desplazamiento cuando esté entre las secciones de rutas y body */
    if($(this).scrollTop() > secciones[6]-170 && $(this).scrollTop() < secciones[7]-170){
        
        $("#menu a").eq(6).addClass("seleccionado");
    }else{
        $("#menu a").eq(6).removeClass("seleccionado");
    }
}