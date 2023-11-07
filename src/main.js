// Importa las funciones necesarias desde el archivo 'firebase.js'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, googleProvider } from './lib/firebase.js';
import { editPost, getPosts, createPost, deletePost, logout, login, register } from './lib/services.js';

// Evento para el formulario de registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const isRegistered = register(email, password);

    if (isRegistered) {
      console.log('Usuario registrado con éxito');
    } else {
      console.log('El usuario ya existe');
    }
  } catch (error) {
    console.error('Error al registrar usuario:', error.message);
  }
});

// Evento para el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const isLoggedIn = login(email, password);

    if (isLoggedIn) {
      console.log('Usuario inició sesión con éxito');
    } else {
      console.log('Inicio de sesión fallido. Verifica tu correo y contraseña.');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
  }
});

// Evento para el botón de autenticación con Google
document.getElementById('google-auth-btn').addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log('Usuario autenticado con Google:', user);
  } catch (error) {
    console.error('Error al autenticar con Google:', error.message);
  }
});

// Evento para el formulario de publicación de posts
document.getElementById('post-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const postContent = document.getElementById('post-content').value;

  try {
    const postId = createPost(postContent, auth.currentUser.email);

    document.getElementById('post-content').value = '';

    updatePostList();
  } catch (error) {
    console.error('Error al publicar el post:', error.message);
  }
});

// Evento para el botón de cerrar sesión
document.getElementById('logout-btn').addEventListener('click', async () => {
  try {
    await logout();

    window.location.href = 'index.html';
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
});

// Función para actualizar la lista de posts en el muro
const updatePostList = async () => {
  const posts = getPosts();
  const postList = document.getElementById('post-list');
  postList.innerHTML = '';

  posts.forEach((post) => {
    const postItem = document.createElement('li');
    postItem.innerHTML = `<strong>${post.email}:</strong> ${post.content} 
                          <button class="edit-btn" data-id="${post.id}">Editar</button>
                          <button class="delete-btn" data-id="${post.id}">Eliminar</button>`;
    postList.appendChild(postItem);
  });

  document.querySelectorAll('.edit-btn').forEach((editButton) => {
    editButton.addEventListener('click', () => {
      const postId = editButton.dataset.id;
      const postContent = prompt('Edita el post:', getPostContentById(postId));

      if (postContent !== null) {
        try {
          editPost(postId, postContent);
          updatePostList();
        } catch (error) {
          console.error('Error al editar el post:', error.message);
        }
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const postId = deleteButton.dataset.id;

      if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
        try {
          deletePost(postId);
          updatePostList();
        } catch (error) {
          console.error('Error al eliminar el post:', error.message);
        }
      }
    });
  });
};

// Obtiene el contenido de un post por su ID
const getPostContentById = (postId) => {
  const posts = getPosts();
  const post = posts.find((p) => p.id === postId);
  return post ? post.content : '';
};

// Llama a la función para actualizar la lista de posts al cargar la página
updatePostList();
