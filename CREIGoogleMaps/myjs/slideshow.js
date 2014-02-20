$(window).on("ready", inicio);

function inicio(){
    /* Vamos a crear en nuestra etiqueta "body" de nuestro index.html una o varias capas (div). Para ello requerimos de la funcion append() de jQuery*/
    $("body").append("<div id='previewSlideshow'><div id='imagen'><img src='' style='width: 100%; height: 100%;'/><div id='descripcion'></div><div id='cerrar'>Cerrar</div></div></div>") /* Con esta linea de código, nos ahorramoe el hecho de agregar lineas de código a nuestro index.html, jQuery con la funcion append se encargará de generar todo este código */
    /* Creamos un evento para activar todo */
    $("#slideshow img").on("click", abrirImagen);
    $("#previewSlideshow #cerrar").on("click", cerrarImagen);
}

/* Con esta funciopn simplemente abrimos nuestra imagen */
function abrirImagen(){
    $("#previewSlideshow").fadeIn(); /* Con esto le decimos que aparezca automáticamente cuando le demos click */
    $("#previewSlideshow img").attr("src","../myimg/slideshow/slideshow"+($(this).index()+1)+".jpg") /* Con esto cargamos la imagen verdadera con la imagen que cargamos arriba. Con "$(this).index()" obtenemos el numero del arreglo mas uno para concatenar, quedando de esta forma: "slideshow1.jpg*/
    $("#previewSlideshow #descripcion").text($(this).attr("title"));
}

function cerrarImagen(){
  $("#previewSlideshow").fadeOut();
}