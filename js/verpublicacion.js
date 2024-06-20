import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref as dbRef, onValue } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';
import { Credenciales } from './credenciales.js';

const firebaseConfig = Credenciales.getFirebaseConfig();
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function displayPublications() {
    const publicationsRef = dbRef(database, 'Publicaciones');
    const blogsContainer = document.getElementById('blogs');

    onValue(publicationsRef, (snapshot) => {
        const data = snapshot.val();
        blogsContainer.innerHTML = ''; 

        for (const key in data) {
            if (data.hasOwnProperty(key)) {

                const publication = data[key];

                const publicationElement = document.createElement('div');

                publicationElement.classList.add('publication');

                const descriptionElement = document.createElement('p');

                descriptionElement.textContent = publication.description;

                descriptionElement.classList.add('publication-description');

                const imageElement = document.createElement('img');

                imageElement.src = publication.imageUrl;

                imageElement.alt = 'Imagen de la publicación';

                imageElement.classList.add('publication-image');

                imageElement.width = 250;

                imageElement.height = 150;

                publicationElement.appendChild(descriptionElement);
                
                publicationElement.appendChild(imageElement);

                blogsContainer.appendChild(publicationElement);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', displayPublications);
