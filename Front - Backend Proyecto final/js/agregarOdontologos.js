const form = document.getElementById("agregarForm");
const apiURL = "http://localhost:8080/";
const btn= document.getElementById("btn-agregar");
const matricula = document.getElementById("matricula");



// validamos tambien de la parte del front la longitud de la matricula. para activar el boton de agregar
matricula.addEventListener('input', 
  ()=>{
    if (matricula.value.length >= 5){
      btn.disabled = false
    }else {
      btn.disabled = true
    }
  } 
) 

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;



  // llamando al endpoint de agregar
  const datosFormulario = {
    matricula : matricula.value,
    nombre,
    apellido,
    };

  fetch(`${apiURL}odontologo/guardar`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(datosFormulario),
})
  .then((response) => {
    console.log("Raw response:", response); // Ver la respuesta en crudo
    return response.json(); // Intentar parsear el JSON
  })
  .then((data) => {
    console.log(data);
    alert("Odontólogo agregado con éxito");
    form.reset(); // Resetear el formulario
  })
  .catch((error) => {
    console.error("Error agregando odontólogo:", error);
  });
});