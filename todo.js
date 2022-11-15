//VARIABLES
const formulario = document.querySelector("#formulario");
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
const enCurso = document.querySelector("#enCurso");
let tareas = [];


//FUNCIONES


const validarFormulario = (e) => {
    e.preventDefault()
    //VALIDAR INPUT
    const tarea = document.querySelector("#tarea").value;
    if (tarea.length <= 0) {
        alert("Formulario vacio")
        return;
    } 

    const objTarea = {
        id: Date.now(),
        tarea: tarea,
        estado: false
    }
    tareas = [...tareas, objTarea];
    formulario.reset();
    mostrarHTML()
    
localStorage.setItem(tarea,JSON.stringify(tarea))
 const tareasGuardadas = localStorage.getItem(tarea)
 return tareasGuardadas;

}



const mostrarHTML = () => {

    task.innerHTML = "";

    if (tareas.length < 1 ) {
        let mensaje = document.createElement("h5");
        mensaje.textContent = "SIN TAREAS";
        return;
    }

    tareas.forEach((item) => {
        const itemTarea = document.createElement("div");
        itemTarea.classList.add("item-tarea");
        itemTarea.innerHTML = `
        ${item.estado ? (
                `<p class="completa">${item.tarea}</p>`
            ) : (
                `<p>${item.tarea}</p>`
            )}
          <div class="botones">
          <button data-id = "${item.id}" class="eliminar btn btn-danger">x</button>
          <button data-id = "${item.id}" class="completada btn btn-primary">✓</button>
          
        </div> 
        `;
        task.appendChild(itemTarea)
    })

//mostrar total y completadas

const totalTareas = tareas.length;
total.textContent = `Total = ${totalTareas}`
const tareasCompletadas = tareas.filter(item => item.estado === true).length;
completadas.textContent = `Completadas = ${tareasCompletadas}`;
enCurso.textContent = `enCurso = ${totalTareas - tareasCompletadas}`;
}

//ELIMINAR TAREA

const eliminarTarea = (e) => {
    if (e.target.classList.contains("eliminar")) {
        const tareaID = Number(e.target.getAttribute("data-id"));
        const eliminar = tareas.filter((item) => item.id !== tareaID);
        tareas = eliminar;
       
    }
    mostrarHTML()
}




const tareaCompletada = (e) => {
    if (e.target.classList.contains("completada")) {
        const tareaID = Number(e.target.getAttribute("data-id"));

        //completado
        tareas.map((item) => {
            if (item.id === tareaID) {
                item.estado = !item.estado;
                return item;
            }
          
        })
        mostrarHTML()

    }
}

//EVENTOS

formulario.addEventListener("submit", validarFormulario);
task.addEventListener("click", eliminarTarea);
task.addEventListener("click", tareaCompletada);

