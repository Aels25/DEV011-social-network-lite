/* eslint-disable no-alert */
// Importa las funciones necesarias desde el archivo 'services.js' y 'firebase.js'
import {
  getPosts, createPost, editPost, deletePost,
} from '../lib/services.js';
import { auth } from '../lib/firebase.js';

function muro(navigateTo) {
  // Declaración de postList
  let postList;
  let errorContainer;

  // Función para manejar errores y mostrar un mensaje en el DOM
  const handleError = (error) => {
    errorContainer.textContent = `Error: ${error.message}`;
  };

  // Función para actualizar la lista de posts en el muro
  const updatePostList = async () => {
    try {
      // Obtiene la lista de posts
      const posts = await getPosts();

      // Limpia la lista de posts existente
      postList.innerHTML = '';

      // Agrega cada post a la lista
      posts.forEach((post) => {
        const postItem = document.createElement('li');
        postItem.classList.add('post-item'); // Agrega la clase 'post-item' al cuadro del post

        // Verifica si 'post' es null o undefined antes de acceder a sus propiedades
        if (post) {
          // Contenido del post
          const postContent = document.createElement('div');
          postContent.textContent = `${post.email}: ${post.content}`;

          // Botón para eliminar un post
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.classList.add('delete-post-button'); // Agrega la clase 'delete-post-button' al botón
          deleteButton.addEventListener('click', async () => {
            if (window.confirm('¿Seguro que quieres eliminar este post?')) {
              try {
                await deletePost(post.id);
                updatePostList(); // Actualiza la lista después de eliminar
              } catch (error) {
                handleError(error);
              }
            }
          });

          // Botón para editar un post
          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.classList.add('edit-post-button'); // Agrega la clase 'edit-post-button' al botón
          editButton.addEventListener('click', () => {
            // Cambia el texto del post a un campo de entrada para editar
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = post.content;

            // Botón para guardar cambios
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Guardar';
            saveButton.classList.add('save-post-button'); // Agrega la clase 'save-post-button' al botón
            saveButton.addEventListener('click', async () => {
              try {
                await editPost(post.id, editInput.value);
                updatePostList(); // Actualiza la lista después de editar
              } catch (error) {
                handleError(error);
              }
            });

            // Reemplaza el contenido del post con el campo de entrada y el botón de guardar
            postContent.innerHTML = ''; // Limpia el contenido existente
            postContent.append(editInput, saveButton);
          });

          // Agrega botones al post
          postItem.append(postContent, deleteButton, editButton);

          // Agrega el post a la lista
          postList.appendChild(postItem);
        } else {
          handleError(new Error('Error: el objeto post es nulo o indefinido'));
        }
      });
    } catch (error) {
      handleError(new Error('Error al obtener la lista de posts'));
    }
  };

  const section = document.createElement('section');
  section.id = 'muro';

  // Formulario de Publicación de Posts
  const postForm = document.createElement('form');
  postForm.id = 'post-form';

  const postLabel = document.createElement('label');
  postLabel.textContent = 'Nuevo Post:';

  const postInput = document.createElement('input');
  postInput.type = 'text';
  postInput.id = 'post-content';
  postInput.required = true;

  const postButton = document.createElement('button');
  postButton.type = 'submit';
  postButton.textContent = 'Publicar';

  postForm.append(postLabel, postInput, postButton);

  // Lista de Posts y Contenedor
  const postListContainer = document.createElement('div');
  postListContainer.id = 'post-list-container';

  // Asignación de valor a postList
  postList = document.createElement('ul');
  postList.id = 'post-list';

  // Contenedor de errores
  errorContainer = document.createElement('div');
  errorContainer.classList.add('error-container'); // Agrega la clase 'error-container' al contenedor

  // Botón de Cerrar Sesión
  const logoutButton = document.createElement('button');
  logoutButton.textContent = 'Cerrar Sesión';
  logoutButton.addEventListener('click', async () => {
    try {
      await auth.signOut();
      // Redirige al usuario a la página de inicio de sesión o a donde desees
      navigateTo('/');
    } catch (error) {
      handleError(new Error('Error al cerrar sesión'));
    }
  });

  // Añade la lista, el contenedor de errores y el contenedor al DOM
  postListContainer.append(postList, errorContainer);
  section.append(postForm, postListContainer, logoutButton);

  // Evento para el formulario de publicación de posts
  postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Obtiene el contenido del nuevo post
    const postContent = postInput.value;

    try {
      // Obtiene el usuario autenticado
      const user = auth.currentUser;

      // Verifica si hay un usuario autenticado
      if (user) {
        // Crea un nuevo post y obtén su id
        const postId = await createPost(postContent, user.email);

        // Verifica si el postId se ha devuelto correctamente
        if (postId) {
          // Limpia el contenido del formulario después de la publicación
          postInput.value = '';

          // Actualiza la lista de posts después de publicar un nuevo post
          updatePostList();
        } else {
          handleError(new Error('Error al obtener el ID del post creado'));
        }
      } else {
        handleError(new Error('Usuario no autenticado'));
        // Puedes redirigir al usuario a la página de inicio de sesión, por ejemplo:
        // navigateTo('/login');
      }
    } catch (error) {
      // Maneja errores e imprime mensajes de error en caso de fallo
      handleError(new Error('Error al publicar el post'));
    }
  });

  // Llama a la función para actualizar la lista de posts al cargar la página
  updatePostList();

  return section;
}

export default muro;
