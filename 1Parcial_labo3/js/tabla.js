const crearTabla = (data, colorCabecera) =>{
    if(!Array.isArray(data)) return null;
    
    const tabla = document.createElement("table");  

    tabla.appendChild(crearCabecera(data[0], colorCabecera));
    tabla.appendChild(crearCuerpo(data));

    return tabla;
}
const crearCabecera = (elemento, color) =>{//thead //validar que es un objeto
    const tHead = document.createElement("thead"),
    headRow = document.createElement("tr");
    headRow.style.setProperty("background-color", color);

    for (const key in elemento) {
        if(key === "id") continue; //no agrega la columna id

        const th = document.createElement("th");        
        //texto = document.createTextNode(key);
        th.textContent = key;
        headRow.appendChild(th);
    }
    console.log(tHead);
    tHead.appendChild(headRow);
    return tHead;
}
//body
const crearCuerpo = (data) =>{
    if(!Array.isArray(data)) return null;
    const tBody = document.createElement("tbody");
    //elementos
    data.forEach((element, index)=>{
        const tr = document.createElement("tr");
       
        if(index %2 == 0){
            tr.classList.add("rowPar")
        }else{
            tr.classList.add("rowImpar")
        }
        for (const key in element) {
            if(key === "id"){                
                tr.setAttribute("data-id", element[key]);
            }else{
                const td = document.createElement("td");
                td.textContent = element[key];               
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    })
    return tBody;
};

export const actualizarTabla = (contenedor, data) =>{
    while(contenedor.hasChildNodes()){
        contenedor.removeChild(contenedor.firstElementChild);
    }
    contenedor.appendChild(crearTabla(data, "blanchedalmond"));
};


