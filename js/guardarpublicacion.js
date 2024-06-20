import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-analytics.js';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence, signOut } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js';
import { getDatabase, ref as dbRef, set, push } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);
const database = getDatabase(app);

document.getElementById('save-information').addEventListener('click', saveInformation);

function saveInformation() {
    const description = document.getElementById('main-desc').value;
    const imageFile = document.getElementById('main-image').files[0];

    if (!description || !imageFile) {
        alert('Por favor ingrese una descripción y seleccione una imagen.');
        return;
    }

    const storageRef = ref(storage, 'images/' + imageFile.name);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('upload-progress').style.width = progress + '%';
        document.getElementById('upload-progress').innerText = progress.toFixed(0) + '%';
    }, (error) => {
        console.error('Error al subir la imagen:', error);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('Imagen subida exitosamente. URL:', downloadURL);
            saveToDatabase(description, downloadURL);
        });
    });
}

function saveToDatabase(description, imageUrl) {

    const newPostKey = push(dbRef(database, 'Publicaciones')).key;

    set(dbRef(database, 'Publicaciones/' + newPostKey), {
        
        description: description,
        imageUrl: imageUrl

    }).then(() => {

        alert('Publicación guardada exitosamente.');


    }).catch((error) => {

        console.error('Error al guardar la publicación:', error);

    });

}

