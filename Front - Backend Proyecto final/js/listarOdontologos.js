const apiURL = "http://localhost:8080";

// Obtener la referencia a la tabla y al modal
const tableBody = document.querySelector("#odontologoTable tbody");
const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editForm = document.getElementById("editForm");
let currentOdontologoId;


// Función para obtener y mostrar los odontólogos
function fetchOdontologos() {
  // listar los odontologos
  fetch(`${apiURL}/odontologo/buscartodos`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Limpiar el contenido actual de la tabla
      tableBody.innerHTML = "";

      // Insertar los datos en la tabla
      data.forEach((odontologo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
              <td>${odontologo.id}</td>
              <td>${odontologo.nombre}</td>
              <td>${odontologo.apellido}</td>
              <td>${odontologo.matricula}</td>
                            
              <td>
                <button class="btn btn-primary btn-sm" onclick="editOdontologo(${odontologo.id}, '${odontologo.nombre}','${odontologo.apellido}', ${odontologo.matricula})">Modificar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteOdontologo(${odontologo.id})">Eliminar</button>
              </td>
            `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Función para abrir el modal y cargar los datos del odontologo
editOdontologo = function (
  id,
  nombre,
  apellido,
  matricula,
) {
  currentOdontologoId = id;
  document.getElementById("editNombre").value = nombre;
  document.getElementById("editApellido").value = apellido;
  document.getElementById("editMatricula").value = matricula;
  editModal.show();
};

// Función para editar un odontologo
editForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nombre = document.getElementById("editNombre").value;
  const apellido = document.getElementById("editApellido").value;
  const matricula = document.getElementById("editMatricula").value;
  

  //modificar un odontologo
  fetch(`${apiURL}/odontologo/modificar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentOdontologoId,
      matricula,
      nombre,
      apellido,
      }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Odontologo modificado con éxito");
      fetchOdontologos();
      editModal.hide();
    })
    .catch((error) => {
      console.error("Error editando odontologo:", error);
    });
});

// Función para eliminar un odontologo
deleteOdontologo = function (id) {
  if (confirm("¿Está seguro de que desea eliminar este odontologo?")) {
    // eliminar el Odontologo
    fetch(`${apiURL}/odontologo/eliminar/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Odontologo eliminado con éxito");
        fetchOdontologos();
      })
      .catch((error) => {
        console.error("Error borrando odontologo:", error);
      });
  }
};

// Llamar a la función para obtener y mostrar los odontólogos
fetchOdontologos();

function searchOdontologoByMatricula() {
  const matricula = document.getElementById("searchMatricula").value.trim();

  if (matricula === "") {
    // Si la matrícula está vacía, listar todos los odontólogos
    fetchOdontologos();
  } else {
    // Si se ingresa una matrícula, buscar por matrícula
    fetch(`${apiURL}/odontologo/buscarmatricula/${matricula}`)
      .then((response) => response.json())
      .then((odontologo) => {
        console.log(odontologo);
        // Limpiar el contenido actual de la tabla
        tableBody.innerHTML = "";

        // Verificar si se encontró el odontólogo
        if (odontologo) {
          const row = document.createElement("tr");

          row.innerHTML = `
                <td>${odontologo.id}</td>
                <td>${odontologo.nombre}</td>
                <td>${odontologo.apellido}</td>
                <td>${odontologo.matricula}</td>
                
                <td>
                  <button class="btn btn-primary btn-sm" onclick="editOdontologo(${odontologo.id}, '${odontologo.nombre}','${odontologo.apellido}', ${odontologo.matricula})">Modificar</button>
                  <button class="btn btn-danger btn-sm" onclick="deleteOdontologo(${odontologo.id})">Eliminar</button>
                </td>
              `;
          tableBody.appendChild(row);
        } else {
          alert("No se encontró ningún odontólogo con esa matrícula.");
        }
      })
      .catch((error) => {
        console.error("Error buscando odontólogo:", error);
      });
  }
}