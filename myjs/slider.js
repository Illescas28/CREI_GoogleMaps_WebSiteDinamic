$(document).on("ready", inicio);

/* Si pensamos que nuestro slider tiene un arreglo de imagenes, la primer imagen se encuentra en la posición "cero", entonces la imagen que se va a cargar a continuación sería la "uno */
/* Declaramos la variable que va a contener la posición de la imagen que se va a cargar a continuación */
var actual = 1;
function inicio(){
    /* Esta variable "intervalo" va a controlar la función setInterval (viene por defecto en javascript) lo que hace es repetir una función cada determinado tienmpo = "runSlider" cada 3 seg = 3000*/
    var intervalo = setInterval("runSlider()", 4000);
}

function runSlider(){
    /* Tenemos que checar que la variable "actual" no se pase del total de imagenes que tenemos */
    /* Para obtener el "número de imagenes" que tiene nuestro "slider", utilizamos "$("#containerSlider img").size(), size() tambien trabaja con arreglos*/
    if(actual == $("#containerSlider img").size()){
        /* que carge la imagen inicial */
        actual = 0;
    }
    
    /* Tenemos que animar nuestro slider */
    $("#containerSlider").animate({
       /* Si nosotros le ponemos un marginlef "positivo" a nuestra capa, el slider va a recorre hacia la derecha pero, hacia la derecha no hay imagenes. */
       /* Entonces... necesitamos recorrer nuetsro marginleft hacia la "izquierda", porque las imagenes estan de ese lado de la panalla */
       /* Entonces, necesitamos hacer nuestro marginleft "negativo" */
       /* El "-1" queremos "multiplicarlo" por la "imagen actual" porque, si le decimos que mueva 850px, solamente lo va a mover una sola vez y ya nop se va a mover */
       /* Entonces, para evitar eso, vamos a multiplicar 850 por el número de la imagen que queremos ver */
       /* Para conocer el tamaño de nuestras imagenes podemos decirle $("#containerSlider img").eq().width()*/
       marginLeft: (-1*actual*$("#containerSlider img").eq(0).width())
       
       /* y que tarde 700 milisegundos */
    }, 700);
    
    /* Por ultimo, incrementamos "actual" en "1" para que siga avanzando el slider */ 
    actual++;
}
