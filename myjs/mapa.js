// Paso 1:
// Variable general para el mapa
var mapa = null;

// // Paso 8:
// Variables generales
// Array para almacenar nuevos marcadores
var marcadoresNuevos = []; 

// Paso 11
// Variable para almacenar los puntos de la BD
var marcadoresDB = [];
// Función para recuperar los puntos de la BD 
function listar(){
    // Antes de listar los marcadores se deben quitar los anteriores del mapa
    quitarMarcadores(marcadoresDB);
    
    // Paso 16:
    // Formulario para Editar puntos
    var formEdit = $("#formEdit");
    $.ajax({
        type:"POST",
        url:"iajax.php",
        dataType:"JSON",
        data: "&tipo=listar",
        success: function(data){
            if(data.estado == "ok"){
                //alert("Hay puntos en la BD"); <- alerta de prueba
                $.each(data.mensaje, function(i, item){
                    // Obtener las coordenadas del punto
                    var posi = new google.maps.LatLng(item.cx, item.cy);
                    // Cargar las propiedades al marcador
                    var marca = new google.maps.Marker({
                        idMarcador : item.IdPunto,
                        position : posi,
                        titulo : item.Titulo,
                        cx: item.cx, // estas coordenadas vienen de la base de datos
                        cy: item.cy  // estas coordenadas vienen de la base de datos
                    });

                    // Marcadores que vienen dela base de datos
                    google.maps.event.addListener(marca, "click", function(){
                       // Agregar evento click al marcador
                       // alert("Hiciste click en "+marca.idMarcador+" - "+marca.titulo) <- alerta de prueba
                    
                        // Entra en el segundo formulario "item2"
                        // y oculta el primero "item1"
                        $(".acordeonActivado").removeClass("acordeonActivado");
                        $("#item1").children().eq(1).hide();
                        $("#item2").children().eq(1).fadeIn(); 
                        $("#item2").addClass("acordeonActivado");
                        
                        // Ahora pasar la información de marcador al formulario
                        formEdit.find("input[name='id']").val(marca.idMarcador);
                        formEdit.find("input[name='titulo']").val(marca.titulo).focus();
                        formEdit.find("input[name='cx']").val(marca.cx);
                        formEdit.find("input[name='cy']").val(marca.cy);

                    });
                    // Agregar el marcador a la cariable "marcadoresDB"
                    marcadoresDB.push(marca);
                    // Ubicar el marcador en el mapa
                    marca.setMap(mapa);
                });
            }
            else
            {
                alert("No hay puntos en la BD");            
            }
        },
        beforeSend: function(){

        },
        complete: function(){

        }
     });
}

// Función para quitar marcadores del mapa
function quitarMarcadores(lista){
    
    //Recoger el array de marcadores
    for(i in lista){
        
        // Quitar marcadores del mapa
        lista[i].setMap(null);
    }
}
function inicio(){
    $("#item1, #item2, #item3").on("click", abrirFormulario); /* Un evento de tipo clik */
    }
function abrirFormulario(){
    $(".acordeonActivado").children().eq(1).hide();
    $(".acordeonActivado").removeClass("acordeonActivado");
    $(this).children().eq(1).fadeIn();
    $(this).addClass("acordeonActivado");
}

$(document).on("ready", iniciarMapa);

//Se admiten los siguientes tipos de mapas:
//
//ROADMAP, que muestra los mosaicos normales en 2D predeterminados de Google Maps.
//SATELLITE muestra imágenes de satélite.
//HYBRID muestra una mezcla de mosaicos fotográficos y una capa de mosaicos para los elementos del mapa más destacados (carreteras, nombres de ciudades, etc.).
//TERRAIN muestra mosaicos de relieve físico para indicar las elevaciones del terreno y las fuentes de agua (montañas, ríos, etc.).

function iniciarMapa(){
    inicio();
    // Paso 1: Coordenadas iniciales "20.67663,-103.34616" = Guadalajara.
    // Paso 1: Declaramos nuestras variables para el punto inicial:
    var divMapa = document.getElementsByClassName("mapa")[0];
    var guadalajara = new google.maps.LatLng(20.67663,-103.34616);
    var myOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // Paso 1: Instanciamos el Objeto de Map en nuestra capa "mapa" de nuestro index.html y le agregamos las propiedades de nuestra variable "myOptions"
    mapa = new google.maps.Map(divMapa, myOptions);
    
    // Paso 1: Le asignamos la propiedad de Centrar con la función setCenter() anuestra variable "map" (instancia del objeto Map).
    mapa.setCenter(guadalajara);
    
    google.maps.event.addListener(mapa, "click", function(event){
        // 
        // 
        // Entra en el primer formulario "item1"
        // y oculta el segundo "item2"
        $(".acordeonActivado").removeClass("acordeonActivado");
        $("#item2").children().eq(1).hide();
        $("#item1").children().eq(1).fadeIn(); 
        $("#item1").addClass("acordeonActivado");
        
        // Paso 2: El evento "click" en el mapa ofrece un parametro "event" el cual devuelve las coordenadas de donde se hizo click.
        //alert(event.latLng); <- alert de prueba
         
        // Paso 9:
        // Pasar los datos del mapa al formulario
        var formulario = $("#form");
        // Paso 3: Coordenadas
        var coordenadas = event.latLng.toString();
        //alert("Las coordenadas son " + coordenadas); <- alerta de prueba
        
        // Paso 4: Remover los paréntesis
        coordenadas = coordenadas.replace("(","");
        coordenadas = coordenadas.replace(")","");
        
        // Paso 5: Coordenadas por separado
        var lista = coordenadas.split(",");
        //alert("La coordenada X es " + lista[0]); <- alerta de prueba
        //alert("La coordenada Y es " + lista[1]); <- alerta de prueba
        
        // Paso 6: Variable para dirección, punto o coordenada
        var direccion = new google.maps.LatLng(lista[0], lista[1]);
        
        // Paso 6: Variable para marcados
        var marcador = new google.maps.Marker({
            // titulo: prompt("¿Título del marcador?"), // Paso 7: Agregar Título en el marcador <- prompt de prueba
            position: direccion, // Paso 6: La posición del nuevo marcador
            map: mapa, // Paso 6: En qué mapa se ubicará el marcador
            animation: google.maps.Animation.DROP, // Paso 6: como aparecerá el marcador
            draggable: false // Paso 6: No permitir el arrastre del marcador
        });
        
        // Paso 9:
        // Pasar las coordenadas al formulario
        formulario.find("input[name='cx']").val(lista[0]);
        formulario.find("input[name='cy']").val(lista[1]);
        
        // Paso 8: 
        // Dejar solo un marcador en el mapa
        // Guardar el marcador en el array
        marcadoresNuevos.push(marcador);
        
        // Paso 7: Agregar evento "click" al marcador
        google.maps.event.addListener(marcador, "click", function(){
           // Paso 7: Mostrar una alerta al hacer click en el marcador
           //alert("click en el marcador"); <- alerta de prueba
           // Paso 7: Mostrar una alerta al hacer click en el marcador
           // alert(marcador.titulo); <- alerta de prueba
        });
       
        // Paso 8:
        // Antes de ubicar el marcador en el mapa, quitar todos los demas
        // Y así solo dejar uno
        quitarMarcadores(marcadoresNuevos);
       
        // Paso 6: Ubicar el marcador en el mapa
        marcador.setMap(mapa);

        // Paso 10: Ya que creamos nuestra base de datos y nuestros archivos "conec.php", "puntosDAO.php" y "iajax.php" 
        // configuraremos nuestro boton "Guardar" para que inserte en la base de datos.
        $("#btn_grabar").on("click", function(){
            
            //Instanciamos el formulario
            var f = $("#form");
            
            // Paso 13:
            //Validar campos
            if(f.find("input[name='titulo']").val().trim()== ""){
                alert("Falta Título");
                return false;
            }
            if(f.find("input[name='cx']").val().trim()== ""){
                alert("Falta Coordenada X");
                return false;
            }
            if(f.find("input[name='cy']").val().trim()== ""){
                alert("Falta Coordenada Y");
                return false;
            }
            // Fin validaciones
            
            // Paso 12:
            // Bloquear el formulario mientras ya se realiza otro proceso
            // ¿Para qué? = Para evitar muchas peticiones al mismo tiempo
            if(f.hasClass("busy")){
                // Cuándo se haga click en el botón "grabar", se marque con una clase "busy"
                // indicando que se ha presionado, y no permitir que se realiza la misma operaxión hasta que esta termine.
                // Si tiene ka ckase "busy", ya no hará nada.
                return false;
            }
            else
            {
                // Si no tiene la clase "busy", se la ponemos ahora
                f.addClass("busy");
                // ¿Cuándo quitar la clase "busy"?
                // Cuando se termine de procesar esta solicitud
                // Es decir, en el "evento -> 'complete'"
            }
            var loaderGrabar = $("#loaderGrabar");
            $.ajax({
               type:"POST",
               url:"iajax.php",
               dataType:"JSON",
               data: f.serialize()+"&tipo=grabar",
               success: function(data){
                   
                   // Paso 15:
                   // Validaremos que se grabe coprrectamente en la base de datos el punto
                   if(data.estado == "ok"){
                   // Notificar al usuario que se ha terminado de procesar
                   loaderGrabar.removeClass("cargando").addClass("cargaterminada").text("Grabado OK").delay(4000).slideUp();
                   //alert(data.mensaje); <- Alerta de prueba
                   listar();
                   }
                   else
                   {
                        // Notificar al usuario que falló su solicitud de guardar
                        loaderGrabar.removeClass("cargando").addClass("etiqueta cargafallo").text("Error al Guardar").slideDown();
                   }
               },
               beforeSend: function(){
                   // Notificar al usuario mientras se procesa su solicitud
                   loaderGrabar.removeClass("cargaterminada cargafallo").addClass("etiqueta cargando").text("Procesando...").slideDown();
               },
               complete: function(){
                   // Paso 12:
                   // Quitar la clase "busy"
                   f.removeClass("busy");
                   // Ahora permitirá otra vez que se realice la acción.
                   
                   // Pase 14:
                   // Agregar Reset despues de grabar
                   f[0].reset(); // JQuery trabaja con array de elementos, javascript no. Así que se debe especificar cual elemento se hará reset, capricho de javascript.
               }
            });
            return false;
        });
    });
    
    // Paso 17:
    // Borrar puntos
    $("#btn_borrar").on("click", function(){
        // Confirmar acción del usuario
        if(confirm("¿Estás seguro?") == false){
            // No hará nada
            return;
        }
        var formEdit = $("#formEdit");
        $.ajax({
            type: "POST",
            url: "iajax.php",
            data: formEdit.serialize()+"&tipo=borrar",
            dataType: "JSON",
            success: function(data){
                // Saber cuando se borró correctamente
                if(data.estado == "ok"){
                    // Mostrar mensaje
                    alert(data.mensaje);
                    // Borrar marcadores nuevos en caso de que hubiesen
                    quitarMarcadores(marcadoresNuevos);
                    // Limpiar el formulario
                    formEdit[0].reset();
                    // Listar otra vez los marcadores
                    listar();
                }
                else
                {
                    // Error al borrar
                    alert(data.mensaje);
                }
            },
            beforeSend: function(){
                
            },
            complete: function(){
                
            }
        });
    });
    
    // Paso 17:
    // Actualizar puntos
    $("#btn_actualizar").on("click", function(){
        // Confirmar acción del usuario
        if(confirm("¿Estás seguro?") == false){
            // No hará nada
            return;
        }
        var formEdit = $("#formEdit");
        $.ajax({
            type: "POST",
            url: "iajax.php",
            data: formEdit.serialize()+"&tipo=actualizar",
            dataType: "JSON",
            success: function(data){
                // Saber cuando se borró correctamente
                if(data.estado == "ok"){
                    // Mostrar mensaje
                    alert(data.mensaje);
                    // Borrar marcadores nuevos en caso de que hubiesen
                    quitarMarcadores(marcadoresNuevos);
                    // Limpiar el formulario
                    formEdit[0].reset();
                    // Listar otra vez los marcadores
                    listar();
                }
                else
                {
                    // Error al borrar
                    alert(data.mensaje);
                }
            },
            beforeSend: function(){
                
            },
            complete: function(){
                
            }
        });
    });
    // Carga los puntos al finalizar de cargar la pagina
    listar();  
    
}
