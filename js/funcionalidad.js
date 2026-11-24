function acceder() {
    // recuperar el valor de la caja de texto
    let usuario = document.getElementById("usuario").value;
    // alert("Usuario: " + usuario);

    // acceder a otra página para ello utilizamos el BOM
    window.location.href = "contenido/principal.html?usuario=" + encodeURIComponent(usuario);
    // añadimos el valor del usuario a la URL para que la página principal pueda acceder a él ?usuario=" + usuario;
    // el encodeURIComponent es para codificar el valor del usuario para que no haya problemas con caracteres especiales en la URL

}
function obtenerUsuario() {
    const parametros = new URLSearchParams(window.location.search);
    return parametros.get("usuario") || "invitado";
}

function claveTareas() {
    return "tareas_" + obtenerUsuario();
}

function cargarUsuario() {
    const usuario = obtenerUsuario();

    document.getElementById("mensaje").textContent =
        "Hola " + usuario + ", las tareas son:";

    mostrarTareas();
}

function obtenerTareas() {
    return JSON.parse(localStorage.getItem(claveTareas())) || [];
}

function guardarTareas(tareas) {
    localStorage.setItem(claveTareas(), JSON.stringify(tareas));
}

function mostrarTareas() {
    const lista = document.getElementById("listaTareas");
    const tareas = obtenerTareas();

    lista.replaceChildren();
    if (tareas.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay tareas pendientes";
        lista.appendChild(mensaje);
        return;
    }

    tareas.forEach((tarea, indice) => {
        const li = document.createElement("li");
        const contenido = document.createElement("span");
        contenido.textContent = tarea.texto + " - ";

        const fecha = document.createElement("strong");
        fecha.textContent = tarea.fecha;
        contenido.appendChild(fecha);

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", () => {
            const tareasActualizadas = obtenerTareas();
            tareasActualizadas.splice(indice, 1);
            guardarTareas(tareasActualizadas);
            mostrarTareas();
        });

        li.append(contenido, botonEliminar);
        lista.appendChild(li);
    });
}
function agregarTarea() {

    const cajaTarea = document.getElementById("tarea");
    const texto = cajaTarea.value.trim();

    if (texto === "") return;

    const tareas = obtenerTareas();
    tareas.push({
        texto: texto,
        fecha: new Date().toLocaleString()

    });
    guardarTareas(tareas);
    mostrarTareas();

    cajaTarea.value = "";
    cajaTarea.focus();
}

window.addEventListener("DOMContentLoaded", cargarUsuario);
li.appendChild(contenido);
// añadimos contenido y boton al li
li.appendChild(botoneliminar);
// añadimos el botoneliminar al li 
lista.appendChild(li);
// añadimos al ul el li

document.getElementById("tarea").value = ""; // limpiamos la caja de texto
document.getElementById("tarea").focus(); // ponemos el foco en la caja de texto


