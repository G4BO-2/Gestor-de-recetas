const formulario = document.getElementById("formulario-receta");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const ingredientes = document.getElementById("ingredientes").value;
  const tiempo = document.getElementById("tiempo").value;
  const dificultad = document.getElementById("dificultad").value;

  let receta = {
    nombre,
    ingredientes,
    tiempo,
    dificultad,
  };

  guardarRecetas(receta);

  return true;
});

const guardarRecetas = (receta) => {
  let recetasGuardadas = JSON.parse(localStorage.getItem("Recetas")) || [];

  recetasGuardadas.push(receta);

  localStorage.setItem("Recetas", JSON.stringify(recetasGuardadas));

  mostrarRecetas();
};

const mostrarRecetas = () => {
  const caja = document.getElementById("lista-recetas");
  caja.innerHTML = "";

  let recetasGuardadas = JSON.parse(localStorage.getItem("Recetas")) || [];

  if (recetasGuardadas.length === 0) {
    caja.innerHTML = "<p>No hay recetas neto</p>";
    return;
  }

  recetasGuardadas.forEach((receta, i) => {
    const llenado = `
    <div class="receta">
        <h3>🍽️ ${receta.nombre}</h3>
        <p>📝 Ingredientes: ${receta.ingredientes}</p>
        <p>⏱️ Tiempo: ${receta.tiempo} min</p>
        <p>📊 Dificultad: ${receta.dificultad}</p>
        <button class="btn-eliminar" data-index="${i}">Eliminar</button>
    </div>
    `;

    caja.innerHTML += llenado;
  });

  caja.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const indice = e.target.getAttribute("data-indice");
      eliminarReceta(parseInt(indice));
    }
  });
};

const eliminarReceta = (i) => {
  let recetasGuardadas = JSON.parse(localStorage.getItem("Recetas")) || [];
  recetasGuardadas.splice(i, 1);
  localStorage.setItem("Recetas", JSON.stringify(recetasGuardadas));
  mostrarRecetas();
};

window.addEventListener("load", () => {
  mostrarRecetas();
});
