// file login.js
import { auth, signInWithEmailAndPassword } from '../lib/firebase'; // Importa las funciones necesarias de Firebase

function login(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonLogin = document.createElement('button');
  const errorContainer = document.createElement('div'); // Nuevo elemento para mostrar errores

  form.id = 'login-form';
  inputEmail.id = 'login-inputEmail';
  inputPass.id = 'login-inputPass';
  buttonReturn.id = 'btnLoginReturn';
  buttonLogin.id = 'btnLogin';

  inputEmail.placeholder = 'Escribe tu email';
  inputPass.placeholder = 'Contraseña';

  title.textContent = 'Conéctate a WANDERWEB';
  buttonLogin.textContent = 'Iniciar Sesión';

  buttonReturn.textContent = 'Volver a la página de inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  // Evento para el formulario de inicio de sesión
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = inputEmail.value;
    const password = inputPass.value;

    try {
      // Utiliza la función de Firebase para iniciar sesión con email y contraseña
      await signInWithEmailAndPassword(auth, email, password);

      // Redirige a la vista del muro después de iniciar sesión
      navigateTo('/muro');
    } catch (error) {
      // Muestra el mensaje de error en el nuevo contenedor de errores
      errorContainer.textContent = `Error al iniciar sesión: ${error.message}`;
    }
  });

  form.append(inputEmail, inputPass, buttonLogin);
  section.append(title, form, buttonReturn, errorContainer);

  return section;
}

export default login;
