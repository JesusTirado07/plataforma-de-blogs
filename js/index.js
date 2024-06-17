import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCbxOOuzZQeLkXbaIkNL4Y1vtQQu0eVgBg",
    authDomain: "blog-tirus.firebaseapp.com",
    projectId: "blog-tirus",
    storageBucket: "blog-tirus.appspot.com",
    messagingSenderId: "844425709875",
    appId: "1:844425709875:web:94b5881b4de9a68f77d646",
    measurementId: "G-7DDDLYJ0VP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

document.getElementById("boton-login").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email !== "" && password !== "") {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                window.location.href = "blog.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                window.alert("Error: " + errorMessage);
            });
    } else {
        window.alert("Campos vacios, por favor ingrese sus credenciales");
    }
});


