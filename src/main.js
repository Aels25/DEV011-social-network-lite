// Importa las funciones necesarias desde el archivo 'firebase.js'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, googleProvider } from './lib/firebase.js';
import { editPost, getPosts, createPost, deletePost, logout, getLoggedInUser } from './lib/services.js';

// Al cargar la aplicación, verifica si hay un usuario logueado
const loggedInUser = getLoggedInUser();

if (loggedInUser) {
  // Hay un usuario logueado, puedes mostrar el contenido correspondiente
  console.log('Usuario logueado:', loggedInUser);
  // También puedes realizar otras acciones, como cargar los posts del usuario, etc.
  updatePostList();
} else {
  // No hay usuario logueado, puedes mostrar un formulario de inicio de sesión o redirigir a la página de inicio de sesión
  console.log('No hay usuario logueado');
  // Realiza acciones apropiadas, como mostrar un formulario de inicio de sesión o redirigir a la página de inicio de sesión
}

// Evento para el formulario de registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtiene los valores del formulario
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Intenta crear un nuevo usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Imprime en la consola el usuario registrado en caso de éxito
    console.log('Usuario registrado:', user);

    // Actualiza la lista de posts después de registrar un nuevo usuario
    updatePostList();
  } catch (error) {
    // Maneja errores e imprime mensajes de error en caso de fallo
    console.error('Error al registrar usuario:', error.message);
  }
});

// Evento para el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtiene los valores del formulario
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    // Intenta iniciar sesión con correo y contraseña
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Imprime en la consola el usuario que inició sesión en caso de éxito
    console.log('Usuario inició sesión:', user);

    // Actualiza la lista de posts después de iniciar sesión
    updatePostList();
  } catch (error) {
    // Maneja errores e imprime mensajes de error en caso de fallo
    console.error('Error al iniciar sesión:', error.message);
  }
});

// Evento para el botón de autenticación con Google
document.getElementById('google-auth-btn').addEventListener('click', async () => {
  try {
    // Intenta autenticar al usuario con Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Imprime en la consola el usuario autenticado con Google en caso de éxito
    console.log('Usuario autenticado con Google:', user);

    // Actualiza la lista de posts después de autenticar con Google
    updatePostList();
  } catch (error) {
    // Maneja errores e imprime mensajes de error en caso de fallo
    console.error('Error al autenticar con Google:', error.message);
  }
});

// Evento para el formulario de publicación de posts
document.getElementById('post-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Obtiene el contenido del nuevo post
  const postContent = document.getElementById('post-content').value;

  try {
    // Crea un nuevo post y obtén su id
    const postId = createPost(postContent, auth.currentUser.email);

    // Limpia el contenido del formulario después de la publicación
    document.getElementById('post-content').value = '';

    // Actualiza la lista de posts después de publicar un nuevo post
    updatePostList();
  } catch (error) {
    // Maneja errores e imprime mensajes de error en caso de fallo
    console.error('Error al publicar el post:', error.message);
  }
});

// Evento para el botón de cerrar sesión
document.getElementById('logout-btn').addEventListener('click', async () => {
  try {
    // Cierra la sesión del usuario
    await logout();

    // Redirige a la página de inicio de sesión después de cerrar sesión
    window.location.href = 'index.html';
  } catch (error) {
    // Maneja errores e imprime mensajes de error en caso de fallo
    console.error('Error al cerrar sesión:', error.message);
  }
});

// Función para actualizar la lista de posts en el muro
const updatePostList = async () => {
  // Obtiene la lista de posts
  const posts = getPosts();

  // Obtén el elemento de la lista de posts
  const postList = document.getElementById('post-list');

  // Limpia la lista de posts existente
  postList.innerHTML = '';

  // Agrega cada post a la lista
  posts.forEach((post) => {
    const postItem = document.createElement('li');
    postItem.innerHTML = `<strong>${post.email}:</strong> ${post.content} 
                          <button class="edit-btn" data-id="${post.id}">Editar</button>
                          <button class="delete-btn" data-id="${post.id}">Eliminar</button>`;
    postList.appendChild(postItem);
  });

  // Agrega eventos de escucha a los botones de editar y eliminar
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
