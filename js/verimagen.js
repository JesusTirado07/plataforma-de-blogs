import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

var formatoImagenes = ["image/gif", "image/png", "image/jpeg"];

$("#selected-image").hide();

function imagenvisualizar(imagen_blog){
    if(imagen_blog.files && imagen_blog.files[0]){
        var leer = new FileReader();
        leer.onload = function(e){
            $("#selected-image").attr('src', e.target.result);
            $("#selected-image").fadeIn();  
        }
        leer.readAsDataURL(imagen_blog.files[0]);
        $("#selected-image").show();
    }
}

$("#main-image").change(function(){
    imagenvisualizar(this);
});

$("#save-information").click(function(){
    $("#main-desc").removeClass("is-invalid");
    $("#main-image").removeClass("is-invalid");

    var desc = $("#main-desc").val();
    var image = $("#main-image").prop("files")[0];

    if(!desc){
        $("#main-desc").addClass("is-invalid");
        return;
    }

    if(!image){
        $("#main-image").addClass("is-invalid");
        return;
    }

    if($.inArray(image["type"], formatoImagenes) < 0){
        $("#main-image").addClass("is-invalid");
        return;
    }
});
