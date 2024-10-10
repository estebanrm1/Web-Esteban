document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');

    menuToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('show');
    });
});


let imagenes = [
    {
        "url": "img/menu/certificado_rc.png",
        "nombre": "Programador Web Full-stack",
        "descripcion": "Certificación de desarrollo web full-stack MERN. Curso realizado en Rolling Code School, cubriendo tecnologías como MongoDB, Express, React y Node.js."
    },
    {
        "url": "img/menu/Certificado_de_Aprobacin (1) (3).jpg",
        "nombre": "Programación Web",
        "descripcion": "Certificado obtenido a través de la plataforma de aprendizaje virtual, impartido por la Secretaría de Innovación Pública, enfocado en habilidades de desarrollo web front-end."
    },
    {
        "url": "img/menu/argentina-programa_27_argentina_programa_febrero_abril_2022_435289_esteban_molina.jpg",
        "nombre": "Argentina Programa",
        "descripcion": "Certificación oficial de Argentina Programa, enfocada en fundamentos de programación y desarrollo web."
    }
];

let atras = document.getElementById('atras');
let atrasSm = document.getElementById('atras-sm');
let adelante = document.getElementById('adelante');
let adelanteSm = document.getElementById('adelante-sm');
let imagen = document.querySelector('#img-certificado .img-certificado');  // Aquí seleccionamos la imagen existente
let puntos = document.getElementById('puntos');
let textoNombre = document.querySelector('#certificado-nombre');
let textoDescripcion = document.querySelector('#certificado-descripcion');
let actual = 0;

function actualizarCarrusel() {
    // Actualizamos los atributos en lugar de reemplazar la imagen completa
    imagen.src = imagenes[actual].url;
    textoNombre.textContent = imagenes[actual].nombre;
    textoDescripcion.textContent = imagenes[actual].descripcion;
    posicionCarrousel();
}

atras.addEventListener('click', function() {
    actual = (actual - 1 + imagenes.length) % imagenes.length;  // Movimiento circular
    actualizarCarrusel();
});

adelante.addEventListener('click', function() {
    actual = (actual + 1) % imagenes.length;  // Movimiento circular
    actualizarCarrusel();
});

//Funciones para las flechas en dispositivos chicos

atrasSm.addEventListener('click', function() {
    actual = (actual - 1 + imagenes.length) % imagenes.length;  // Movimiento circular
    actualizarCarrusel();
});

adelanteSm.addEventListener('click', function() {
    actual = (actual + 1) % imagenes.length;  // Movimiento circular
    actualizarCarrusel();
});

function posicionCarrousel() {
    puntos.innerHTML = "";
    for (let i = 0; i < imagenes.length; i++) {
        if (i == actual) {
            puntos.innerHTML += '<p class="bold">.</p>';
        } else {
            puntos.innerHTML += '<p>.</p>';
        }
    }
}

// Inicializamos el carrusel al cargar la página
actualizarCarrusel();
