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



setPersistence(auth, browserLocalPersistence);
document.getElementById("btn-cerrar").addEventListener("click", function() {
    signOut(auth).then(() => {
        console.log("Sesión cerrada correctamente");
        window.location.href = "login.html";
    }).catch((error) => {
        console.log("Error al cerrar sesión:", error);
    });
});