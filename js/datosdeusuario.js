import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById("boton-datos").addEventListener("click", function() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var ciudad = document.getElementById("ciudad").value;
    var telefono = document.getElementById("phone").value;
    var genero = document.getElementById("genero").value;
    var descripcion = document.getElementById("descripcion").value;

    if (nombre !== "" && apellido !== "" && ciudad !== "" && telefono !== "" && genero !== "" && descripcion !== "") {
        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            set(ref(database, 'Usuarios/' + userId), {
                nombre: nombre,
                apellido: apellido,
                ciudad: ciudad,
                telefono: telefono,
                genero: genero,
                descripcion: descripcion
            }).then(() => {
                window.location.href = "blog.html";
            }).catch((error) => {
                console.error(error);
                window.alert("Error: " + error.message);
            });
        } else {
            window.alert("Usuario no autenticado.");
        }
    } else {
        window.alert("Favor de ingresar todos los datos");
    }
});
