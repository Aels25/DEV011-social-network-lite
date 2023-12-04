// signup.js
import { auth, createUserWithEmailAndPassword } from '../lib/firebase'; // Importa las funciones necesarias de Firebase

function signup(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputUsername = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonSignup = document.createElement('button');
  const errorContainer = document.createElement('div'); // Elemento para mostrar mensajes de error

  inputUsername.placeholder = 'Escribe tu nombre';
  inputEmail.placeholder = 'Escribe tu email';
  inputPass.placeholder = 'Crea una contraseña';

  title.textContent = 'Regístrate y Comienza tu Aventura';
  buttonSignup.textContent = 'Registrarse';

  buttonReturn.textContent = 'Volver a la página de inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  // Agrega un id al formulario
  form.id = 'signup-form';
  buttonReturn.id = 'btnReturn'; // Asigna un ID único para el botón de retorno
  buttonSignup.id = 'btnSignup';
  inputEmail.id = 'inputEmail';
  inputPass.id = 'inputPass';

  // Evento para el formulario de registro
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    try {
      // Utiliza la función de Firebase para crear un nuevo usuario con email y contraseña
      await createUserWithEmailAndPassword(auth, email, password);

      // Redirige a la vista del muro después de registrar al nuevo usuario
      navigateTo('/muro');
    } catch (error) {
      // Muestra un mensaje de error en el interfaz de usuario
      errorContainer.textContent = `Error al registrar: ${error.code} - ${error.message}`;
    }
  });

  form.append(inputUsername, inputEmail, inputPass, buttonSignup);
  section.append(title, form, buttonReturn, errorContainer);

  return section;
}

export default signup;
