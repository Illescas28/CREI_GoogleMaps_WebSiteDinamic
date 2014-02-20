$(document).on("ready", inicio);

function inicio(){
    $(".item").on("click", abrirAcordeon); /* Un evento de tipo clik */
}

function abrirAcordeon(){
    $(".acordeonActivado").children().eq(1).hide();
    $(".acordeonActivado").removeClass("acordeonActivado");
    $(this).children().eq(1).fadeIn();
    $(this).addClass("acordeonActivado");
}