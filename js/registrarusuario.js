import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("boton-registro").addEventListener("click", function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email && password) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario registrado:', user);
                window.alert('Usuario registrado exitosamente');
                setTimeout(() => {
                    window.location.href = "datos.html";
                }, 100);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error al registrar usuario:', errorCode, errorMessage);
                window.alert('Error al registrar usuario: ' + errorMessage);
            });
    } else {
        window.alert("Datos vacíos, por favor ingrese su información");
    }
});
