import {actualizarTabla} from "./tabla.js";
import { Monstruo } from "./monstruo.js";

const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];
localStorage.setItem("monstersSelect", JSON.stringify(tipos));
const $listaSelect = JSON.parse(localStorage.getItem("monstersSelect"));
const $select = document.getElementById("selectTipo");
cargarSelect($listaSelect);


const $seccionTabla = document.getElementById("tabla");
const $formulario = document.forms[0];
console.log($formulario);


//si hay algo en el local storage
const monstruos = JSON.parse(localStorage.getItem("monstruos")) || []; //si no hay nada con la key personas devuelve null

if(monstruos.length) actualizarTabla($seccionTabla, monstruos);


$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("Enviando...");  
      
    //validar
    console.log($formulario.txtId.value);
    const {txtId, rngBarra, rdoDefensa, slctTipo, txtAlterEgo, txtNombre} = $formulario;    

    if(txtId.value ==="" ){              
        const newMonstruo = new Monstruo(Date.now(), txtNombre.value, slctTipo.value, txtAlterEgo.value, rdoDefensa.value, rngBarra.value );
        handlerCreate(newMonstruo);    
        $formulario.txtId.value="";        
    // }else{
              
    //     const updatedMonstruo = new Monstruo(Date.now(), txtNombre.value, slctTipo.value, txtAlterEgo.value, rdoDefensa.value, rngBarra.value);
    //     handlerUpdate(updatedMonstruo);
    //     $formulario.txtId.value="";    
        
    }
    $formulario.reset();

})

function handlerCreate(nuevoMonstruo){    
    monstruos.push(nuevoMonstruo);
    actualizarStorage("monstruos", monstruos);
    actualizarTabla($seccionTabla, monstruos);
}
function handlerUpdate(editMonstruo){
    let index = monstruos.findIndex((mon)=> mon.id == editMonstruo.id);
    monstruos.splice(index, 1, editMonstruo); //corta y reemplazar. Se puede hacer un push y ordenar el array

    actualizarStorage("monstruos", monstruos);
    actualizarTabla($seccionTabla, monstruos);
}
function handlerDelete(id){
    let index = monstruos.findIndex((mon)=> mon.id == id);
    monstruos.splice(index, 1);

    actualizarStorage("monstruos", monstruos);
    actualizarTabla($seccionTabla, monstruos);
    $formulario.reset(); //agregar una ventana confirm //agregar hoover
}

//$seccionTabla.appendChild(crearTabla(personas, "coral"));


window.addEventListener("click", handlerClick); 
function handlerClick(e){ //registra clik en cualquier lugar de la pantalla, tengo que filtrar lo q me sirve

    const $botonEliminar = document.getElementById("botonEliminar");          
    const $botonSubmit = document.getElementById("btnSubmit");
    const $botonCancelar = document.getElementById("btnCancelar");
    const $botonModificar = document.getElementById("btnModificar");
    if(e.target.matches("td")){
        const id = e.target.parentElement.getAttribute("data-id");
        //console.log(id);
        const selectedMonstruo = monstruos.find((mon)=>{
            return mon.id == id;            
        })        
        cargarFormMonstruo($formulario, selectedMonstruo);
        
        if($botonEliminar.classList.contains("oculto")){
            mostrarBoton($botonEliminar);
            mostrarBoton($botonCancelar);
            mostrarBoton($botonSubmit);
            mostrarBoton($botonModificar);
        }
        //si apretas eliminar te sale una pregunta
        //si apretas devuelta un monstruo se carga monstruo
       
    }
    else if(e.target.matches("input[value='Eliminar Monstruo']")){        
        const id = parseInt($formulario.txtId.value);        
        handlerDelete(id);   
        mostrarBoton($botonSubmit);
        mostrarBoton($botonEliminar);
        mostrarBoton($botonCancelar);  
        mostrarBoton($botonModificar);
        $formulario.txtId.value="";     
        $formulario.reset();
    }else if(e.target.matches("input[value='Cancelar']")){                
        $formulario.reset();
        mostrarBoton($botonSubmit);
        mostrarBoton($botonEliminar);
        mostrarBoton($botonCancelar);
        mostrarBoton($botonModificar);
        $formulario.txtId.value="";        
    }
    else if(e.target.matches("input[value='Modificar Monstruo']")){  
        const {txtId, rngBarra, rdoDefensa, slctTipo, txtAlterEgo, txtNombre} = $formulario;       
        const id = parseInt($formulario.txtId.value);  
        const updatedMonstruo = new Monstruo(id, txtNombre.value, slctTipo.value, txtAlterEgo.value, rdoDefensa.value, rngBarra.value);
        handlerUpdate(updatedMonstruo);
        //$formulario.txtId.value="";      
        
        mostrarBoton($botonSubmit);
        mostrarBoton($botonEliminar);
        mostrarBoton($botonCancelar);  
        mostrarBoton($botonModificar);
        $formulario.txtId.value="";     
        $formulario.reset();
    }
};

function actualizarStorage(clave, data){
    localStorage.setItem(clave, JSON.stringify(data)); //lo piso
}

function cargarFormMonstruo(formulario, monstruo){
    formulario.txtId.value = monstruo.id;
    formulario.txtNombre.value = monstruo.nombre;
    formulario.slctTipo.value = monstruo.alias;
    formulario.txtAlterEgo.value = monstruo.tipo;
    formulario.rdoDefensa.value = monstruo.defensa;
    formulario.rngBarra.value = monstruo.miedo;      
}
 
function cargarSelect(lista){
for (let i = 0; i < lista.length; i++) {
    const opcion = document.createElement("option");
    opcion.value = lista[i];
    opcion.text = lista[i];
    $select.add(opcion);
}
}

function mostrarBoton($boton){
    //$boton = document.getElementById("botonEliminar");    
    $boton.classList.toggle("oculto");
}

