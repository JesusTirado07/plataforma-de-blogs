import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

auth.onAuthStateChanged((user) => {
    
    if (user) {

        const userId = user.uid;
        const userRef = ref(database, 'Usuarios/' + userId);
        
        get(userRef).then((snapshot) => {

            if (snapshot.exists()) {
                const userData = snapshot.val();
                populateUserData(userData);
            } else {
                console.log("No data available");
            }

        }).catch((error) => {
            console.error(error);
        });
    } else {

        console.log("No user signed in");
    }
});

function populateUserData(userData) {

    document.getElementById('nombre').textContent = userData.nombre;
    document.getElementById('apellido').textContent = userData.apellido;
    document.getElementById('ciudad').textContent = userData.ciudad;
    document.getElementById('telefono').textContent = userData.telefono;
    document.getElementById('genero').textContent = userData.genero;
    document.getElementById('descripcion').textContent = userData.descripcion;

}
