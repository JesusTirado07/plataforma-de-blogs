import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);
document.getElementById("btn-cerrar").addEventListener("click", function() {
    signOut(auth).then(() => {
        console.log("Sesión cerrada correctamente");
        window.location.href = "login.html";
    }).catch((error) => {
        console.log("Error al cerrar sesión:", error);
    });
});