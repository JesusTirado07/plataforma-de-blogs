import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.getElementById("boton-contra").addEventListener("click", function() {
    var email = document.getElementById("email").value;

    if (email !== "") {
        sendPasswordResetEmail(auth, email).then(function() {
            window.alert("Enviamos un mensaje a tu correo, verifícalo para restablecer la contraseña");
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Error: " + errorMessage);
        });
    } else {
        window.alert("Por favor ingrese su correo");
    }
});
