import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyCbxOOuzZQeLkXbaIkNL4Y1vtQQu0eVgBg",
    authDomain: "blog-tirus.firebaseapp.com",
    projectId: "blog-tirus",
    storageBucket: "blog-tirus.appspot.com",
    messagingSenderId: "844425709875",
    appId: "1:844425709875:web:94b5881b4de9a68f77d646",
    measurementId: "G-7DDDLYJ0VP"
};

document.addEventListener("DOMContentLoaded", function() {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);

    setPersistence(auth, browserLocalPersistence).catch((error) => {
        console.error("Error setting persistence:", error);
    });

    const botonLogin = document.getElementById("boton-login");
    const btnCerrar = document.getElementById("btn-cerrar");

    if (botonLogin) {
        botonLogin.addEventListener("click", function() {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email !== "" && password !== "") {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        window.location.href = "blog.html";
                    })
                    .catch((error) => {
                        window.alert("Error: " + error.message);
                    });
            } else {
                window.alert("Campos vacíos, por favor ingrese sus credenciales");
            }
        });
    } else {
        console.error("El elemento 'boton-login' no se encontró.");
    }

    if (btnCerrar) {
        btnCerrar.addEventListener("click", function(event) {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace
            signOut(auth).then(() => {
                window.location.href = "login.html";
            }).catch((error) => {
                window.alert("Error: " + error.message);
            });
        });
    } else {
        console.error("El elemento 'btn-cerrar' no se encontró.");
    }

    onAuthStateChanged(auth, (user) => {
        const isLoginPage = window.location.pathname.endsWith("login.html");
        if (!user && !isLoginPage) {
            window.location.href = "login.html";
        }
    });
});

// $("#boton-registro").click(function(){
//     var email = $("#email").val();
//     var password = $("#password").val();
//     var passwordos = $("#passwordos").val();

//     if(email != "" && passwordos != "" && password != "" ){
//         if(password == passwordos){
//             var resultado = firebase.auth().createUserWithEmailAndPassword(email,password);
//             resultado.catch(function(error){
//                 var errorCode = error.code;
//                 var errorMensaje = error.message;
//                 console.log(errorCode);
//                 console.log(errorMensaje);
//                 window.alert("Error: " +errorMensaje)
//             });
//         }else{
//             window.alert("Las contraseñas no coinciden");
//         }
//     }
//     else{
//         window.alert("Datos vacíos, por favor ingrese su información");
//     }
// });
