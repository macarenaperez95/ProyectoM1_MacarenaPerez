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


        let colorHsl = `hsl(${tono}, ${saturacion}%, ${luminosidad}%)`;


        // Convertir el color a HEX

        let colorHex = convertirAHex(tono, saturacion, luminosidad);

        // Guardar los códigos HEX y HSL en el array

        colores.push({
            hex: colorHex,
            hsl: colorHsl

        });

    }

    // Bucle for: Recorrer los colores guardados en el array    

    for (let i = 0; i < colores.length; i++) {
        let colorHex = colores[i].hex; 
        let colorHsl = colores[i].hsl;

        // Crea las tarjetas de colores utilizando el DOM

        let tarjetaColor = document.createElement("div");
        tarjetaColor.classList.add("tarjeta-color");

        let muestraColor = document.createElement("div");
        muestraColor.classList.add("muestra-color");
        muestraColor.style.backgroundColor = colorHex;

        tarjetaColor.appendChild(muestraColor);
        

        // Mostrar código HEX y HSL

        let textoHex = document.createElement("button");
        textoHex.textContent = colorHex;
        tarjetaColor.appendChild(textoHex);
        textoHex.classList.add("boton-codigo");


        let textoHsl = document.createElement("button");
        textoHsl.textContent = colorHsl;
        tarjetaColor.appendChild(textoHsl);
        textoHsl.classList.add("boton-codigo");

        // Evento click: copiar los códigos HEX Y HSL por separado

        textoHex.addEventListener("click", () => {
            navigator.clipboard.writeText(colorHex);
            textoHex.textContent = "Copiado";
});

        textoHsl.addEventListener("click", () => {
            navigator.clipboard.writeText(colorHsl);
            textoHsl.textContent = "Copiado";
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




