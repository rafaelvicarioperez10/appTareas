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

    const mensaje = document.getElementById("mensaje");

    mensaje.replaceChildren(
        "Hola ",
        Object.assign(document.createElement("span"), {
            className: "nombre-usuario",
            textContent: usuario
        }),
        ", las tareas son:"
    );
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

        const botones = document.createElement("div");
        botones.classList.add("botones-tarea");

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.classList.add("boton-tarea");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.classList.add("boton-tarea");

        botonEditar.addEventListener("click", () => {
            const cajaEdicion = document.createElement("textarea");

            cajaEdicion.value = tarea.texto;

            const botonesEdicion = document.createElement("div");
            botonesEdicion.classList.add("botones-tarea");

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar";
            botonGuardar.classList.add("boton-tarea");

            const botonCancelar = document.createElement("button");
            botonCancelar.textContent = "Cancelar";
            botonCancelar.classList.add("boton-tarea");

            botonesEdicion.append(botonGuardar, botonCancelar);
            li.replaceChildren(cajaEdicion, botonesEdicion);
            cajaEdicion.focus();

            botonGuardar.addEventListener("click", () => {
                const textoNuevo = cajaEdicion.value.trim();

                if (textoNuevo === "") {
                    cajaEdicion.focus();
                    return;
                }

                const tareasActualizadas = obtenerTareas();
                tareasActualizadas[indice].texto = textoNuevo;
                tareasActualizadas[indice].fecha = new Date().toLocaleString();

                guardarTareas(tareasActualizadas);
                mostrarTareas();
            });

            botonCancelar.addEventListener("click", mostrarTareas);
        });

        botonEliminar.addEventListener("click", () => {
            const tareasActualizadas = obtenerTareas();
            tareasActualizadas.splice(indice, 1);
            guardarTareas(tareasActualizadas);
            mostrarTareas();
        });

        botones.append(botonEditar, botonEliminar);
        li.append(contenido, botones);
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


