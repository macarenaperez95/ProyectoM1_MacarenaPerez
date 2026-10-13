// selección de los elementos del DOM

let opcionColores = document.querySelector("#cantidadDeColores");
console.log(opcionColores);
console.log(opcionColores.value);

let boton = document.querySelector("#generarPaleta");
console.log(boton);

let contenedorColores = document.querySelector("#contenedorColores");


// Función principal: Generar Paleta

function generarPaleta() {
    console.log("mostrarPaleta");
    console.log(opcionColores.value);

// creación del array y limpieza del contenedor

    let colores =[];
        contenedorColores.innerHTML = "";  

// Bucle for: Generar colores aleatorios
        
    for (let i = 0; i < opcionColores.value; i++) {
        let tono = Math.floor(Math.random() * 360);
        let saturacion = Math.floor(Math.random() * 101);
        let luminosidad = Math.floor(Math.random() * 101);

// Convertir el color a HEX

        let colorHex = convertirAHex(tono, saturacion, luminosidad);

// Guardar el colore en el array

        colores.push(colorHex);

    }

// Bucle for: Recorrer el array    

    for (let i = 0; i < colores.length; i++) {
        let colorHex = colores[i];

// Creación de elementos en el HTML con el DOM

        let tarjetaColor = document.createElement("div");
        tarjetaColor.classList.add("tarjeta-color");
        tarjetaColor.style.backgroundColor = colorHex;

// Mostrar código HEX

        let textoHex = document.createElement("p");
        textoHex.textContent = colorHex;
        tarjetaColor.appendChild(textoHex);

// Evento click: copiar color

        tarjetaColor.addEventListener("click", () => {
          navigator.clipboard.writeText(colorHex);
          tarjetaColor.textContent = "¡Copiado!";
});

// Agregar la tarjeta al contenedor

         contenedorColores.appendChild(tarjetaColor);
    }
}

// Función para convertir HSL a HEX

function convertirAHex(tono, saturacion, luminosidad) {
    let h = tono;
    let s = saturacion / 100;
    let l = luminosidad / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (h < 60) {
        r = c;
        g = x;
    } else if (h < 120) {
        r = x;
        g = c;
    } else if (h < 180) {
        g = c;
        b = x;
    } else if (h < 240) {
        g = x;
        b = c;
    } else if (h < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    let rojoHex = r.toString(16).padStart(2, "0");
    let verdeHex = g.toString(16).padStart(2, "0");
    let azulHex = b.toString(16).padStart(2, "0");

    return "#" + rojoHex + verdeHex + azulHex;
}

// Evento del botón generar paleta

boton.addEventListener("click", generarPaleta);




