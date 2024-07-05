import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref as dbRef, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-storage.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

let currentEditId = null;

function displayPublications() {
    const publicationsRef = dbRef(database, 'Publicaciones');
    const blogsContainer = document.getElementById('blogs');

    onValue(publicationsRef, (snapshot) => {
        const data = snapshot.val();
        blogsContainer.innerHTML = '';

        const dataEntries = Object.entries(data);

        dataEntries.reverse();

        for (const [key, publication] of dataEntries) {
            const publicationElement = document.createElement('div');
            publicationElement.classList.add('publication');

            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = publication.description;
            descriptionElement.classList.add('publication-description');

            const imageElement = document.createElement('img');
            imageElement.src = publication.imageUrl;
            imageElement.alt = 'El archivo no es compatible';
            imageElement.classList.add('publication-image');
            imageElement.width = 250;
            imageElement.height = 150;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => deletePublication(key);

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.classList.add('edit-button');
            editButton.onclick = () => openEditModal(key, publication.description, publication.imageUrl);

            publicationElement.appendChild(descriptionElement);
            publicationElement.appendChild(imageElement);
            publicationElement.appendChild(deleteButton);
            publicationElement.appendChild(editButton);

            blogsContainer.appendChild(publicationElement);
        }
    });
}

document.addEventListener('DOMContentLoaded', displayPublications);


function deletePublication(publicationId) {
    const publicationRef = dbRef(database, `Publicaciones/${publicationId}`);
    remove(publicationRef)
        .then(() => {
            console.log('Publicación eliminada con éxito');
            displayPublications();
        })
        .catch((error) => {
            console.error('Error al eliminar la publicación:', error);
        });
}

function openEditModal(publicationId, description, imageUrl) {
    currentEditId = publicationId;
    document.getElementById('edit-desc').value = description;
    document.getElementById('edit-selected-image').src = imageUrl;
    $('#editModal').modal('show');
}

document.getElementById('edit-image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('edit-selected-image').src = e.target.result;
    }
    reader.readAsDataURL(file);
});

document.getElementById('save-edit').addEventListener('click', function() {
    const newDescription = document.getElementById('edit-desc').value;
    const newImageFile = document.getElementById('edit-image').files[0];

    if (newImageFile) {
        const imageRef = storageRef(storage, 'images/' + newImageFile.name);
        const uploadTask = uploadBytesResumable(imageRef, newImageFile);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, (error) => {
            console.error('Error uploading new image:', error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                updatePublication(currentEditId, newDescription, downloadURL);
            });
        });
    } else {
        const currentImageUrl = document.getElementById('edit-selected-image').src;
        updatePublication(currentEditId, newDescription, currentImageUrl);
    }
});

function updatePublication(publicationId, description, imageUrl) {
    const publicationRef = dbRef(database, `Publicaciones/${publicationId}`);
    update(publicationRef, {
        description: description,
        imageUrl: imageUrl
    })
    .then(() => {
        console.log('Publicación actualizada con éxito');
        $('#editModal').modal('hide');
        displayPublications();
    })
    .catch((error) => {
        console.error('Error al actualizar la publicación:', error);
    });
}

document.addEventListener('DOMContentLoaded', displayPublications);
