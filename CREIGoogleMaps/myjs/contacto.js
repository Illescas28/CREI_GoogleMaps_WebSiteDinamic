$(document).on("ready", inicio);

function inicio(){
    $("#bEnviar").on("click", validarFormulario);
}

function validarFormulario(){
    
    /* Guardamos en variables todos los campos de nuestra tabla de formulario */
    var nombre = $("#tfNombre").val();
    var correo = $("#tfCorreo").val();
    var asunto = $("#tfAsunto").val();
    var mensaje = $("#tfMensaje").val();
    
    /* Validar cada una de nuestras variables */
    if(nombre == ""){
        $("#tfNombre").addClass("campo-vacio");
    }else{
        $("#tfNombre").removeClass("campo-vacio");
    }
    if(correo == ""){
        $("#tfCorreo").addClass("campo-vacio");
    }else{
        $("#tfCorreo").removeClass("campo-vacio");
    }
    if(asunto == ""){
        $("#tfAsunto").addClass("campo-vacio");
    }else{
        $("#tfAsunto").removeClass("campo-vacio");
    }
    if(mensaje == ""){
        $("#tfMensaje").addClass("campo-vacio");
    }else{
        $("#tfMensaje").removeClass("campo-vacio");
    }
    
    if(nombre == "" || correo=="" || asunto=="" || mensaje ==""){
        $("#errores").fadeIn();
        return false; /* Para que no envie el formulario */
    }else
        $("#errores").fadeOut();
        return true; /* Para que sí envie el formulario */
}
