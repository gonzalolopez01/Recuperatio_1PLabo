document.addEventListener("DOMContentLoaded", function () {
    
    //const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
    const monstruos = cargarMonstruos();
    
    mostrarCartas(monstruos);
});

function mostrarCartas(monstruos) {
    const contenedorCartas = document.getElementById('main');

    monstruos.forEach(monstruo => {
        const $carta = document.createElement('div');
        $carta.classList.add('carta');
        
        $carta.innerHTML = `
        <h3>${monstruo.nombre}</h3>
        <p>Tipo: ${monstruo.tipo}</p>
        <p>Alias: ${monstruo.alias}</p>
        <p>Miedo: ${monstruo.miedo}</p>
        <p>Defensa: ${monstruo.defensa}</p>
        `;
        contenedorCartas.appendChild($carta);
    });
} 

function cargarMonstruos(){
    return JSON.parse(localStorage.getItem("monstruos")) || [];
}