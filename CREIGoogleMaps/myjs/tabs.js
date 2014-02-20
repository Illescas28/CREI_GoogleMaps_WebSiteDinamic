$(document).on("ready", inicio);

/* Para decirle cual es la que queremos mostrar al principio */
var tabInicial = 1 ;
function inicio(){
    $("#tabs a").on("click", abrirTab);
    $(".tabContent").eq(tabInicial - 1).fadeIn(); /* desde aqui le restamos 1 a la variabre tabInicial para elegir la imagen de la posición "cero" del arreglo*/
    $("#tabs a").eq(tabInicial - 1).addClass("tabActual"); /* Para añadir la clase al tab que estoy seleccionando en la variable tabInicial */
}

function abrirTab(){
    /* Cuando le demos click, todas las tabs se deben esconder */
    $(".tabContent").hide();
    
    /* Tenemos que eliminar la clase de la tab inicial o la tab seleccionada y cuando le demos click, debe quitarse eso... o sea que dejamos sin nada de estilos en las pestañas */
    $("#tabs a").removeClass("tabActual");
    
    /* Ahora le añadimos estilo a la pestaña actual y vamos a obtener el index con $(this) --> enlace actual punto index nos va a devolver la posición actual con relacion al arreglo */
    $(".tabContent").eq($(this).index()).fadeIn();
    $(this).addClass("tabActual");
    
    /* para evitar la actualizacion */
    return false
}
