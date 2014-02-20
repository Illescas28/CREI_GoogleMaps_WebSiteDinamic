/* 
    Función para crear el mapa de Google con las rutas
    Ahora veamos la función que generará el mapa de Google con la ruta que se haya definido en el formulario anterior. 
 */
function load() {
   if (GBrowserIsCompatible()) {
      map = new GMap2(document.getElementById("map"));   
      googledirecciones = new GDirections(map, document.getElementById("direcciones"));
      GEvent.addListener(googledirecciones, "load", onGDirectionsLoad);
      GEvent.addListener(googledirecciones, "error", mostrarError);   
      obtenerRuta("Guadalajara, Jalisco", "Cancún, Quitana Roo");   
   }
}

/*
    Para que se muestren las indicaciones de la ruta hay que crear un objeto de clase Gdirections 
    y al construirlo tendremos que pasar como parámetro el objeto GMap2 de nuestro mapa y la etiqueta DIV donde se van a mostrar los resultados de texto de la ruta, 
    es decir, la explicación en texto de todo el recorrido que hay que hacer para realizar ese camino.
*/
googledirecciones = new GDirections(map, document.getElementById("direcciones"));

/*
    También podemos añadir un nuevo evento al objeto creado "googledirecciones" que muestre un resumen de la ruta obtenida mediante la llamada a la función onGDirectionsLoad.
*/
function onGDirectionsLoad(){ 
   //resumen de tiempo y distancia
   document.getElementById("getDistance").innerHTML = googledirecciones.getSummaryHtml(); 
}

/*
    Para controlar algún posible error al cargar la ruta, hay que añadir un nuevo evento al objeto "googledirecciones", 
    para que cuando ocurra algún error, llame a la función mostrarError. 
    En esta función hemos mostrado algunos de los errores necesarios para la clase GDirections que se pueden controlar al crear una ruta, 
    Fuente de errores: más códigos de error en http://code.google.com/intl/es/apis/maps/documentation/reference.html#GGeoStatusCode
*/
function mostrarError(){
    if (gdir.getStatus().code == G_GEO_UNKNOWN_ADDRESS)
       alert("No se ha encontrado una ubicación geográfica que se corresponda con la dirección especificada.");
    else if (gdir.getStatus().code == G_GEO_SERVER_ERROR)
       alert("No se ha podido procesar correctamente la solicitud de ruta o de códigos geográficos, sin saberse el motivo exacto del fallo.");
    else if (gdir.getStatus().code == G_GEO_MISSING_QUERY)
       alert("Falta el parámetro HTTP q o no tiene valor alguno. En las solicitudes de códigos geográficos, esto significa que se ha especificado una dirección vacía.");
   else if (gdir.getStatus().code == G_GEO_BAD_KEY)
       alert("La clave proporcionada no es válida o no coincide con el dominio para el cual se ha indicado.");
    else if (gdir.getStatus().code == G_GEO_BAD_REQUEST)
       alert("No se ha podido analizar correctamente la solicitud de ruta.");
    else alert("Error desconocido.");
    
}

/*
    Al crear el mapa de Google, hemos llamado a la función mostrarRuta() al final del todo, 
    para que al cargar el mapa, muestre una ruta inicial desde Guadalajara hasta Cancún en coche.
*/
function obtenerRuta(desde, hasta) {
   var i;
   var tipo;
   //comprobar tipo trayecto seleccionado
   for (i=0;i<document.form_ruta.tipo.length;i++){ 
      if (document.form_ruta.tipo[i].checked){
      break; 
      }
   } 
   tipo = document.form_ruta.tipo[i].value;
   if(tipo==1){
       //a pie
       googledirecciones.load("from: " + desde + " to: " + hasta,
       { 
           "locale": "es", 
           "travelMode" : G_TRAVEL_MODE_WALKING 
       }
      );
   }else{
        //conduccion
        googledirecciones.load("from: " + desde + " to: " + hasta,
           { 
               "locale": "es", 
               "travelMode" : G_TRAVEL_MODE_DRIVING 
           }
        );
    }
}

/*
    Para cargar la ruta, hay que llamar al método load de la clase GDirections, 
    indicándole las propiedades origen (from), destino (to), idioma(locale) y el tipo de trayecto (travelMode). 
    Si este último parámetro se omite, por defecto se creará una ruta en coche.
*/