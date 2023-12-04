// Importa los elementos necesarios de Firebase
import { auth, googleProvider, signInWithPopup } from '../lib/firebase';

function googlelogin(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const buttonGoogleLogin = document.createElement('button');
  const errorContainer = document.createElement('div'); // Elemento para mostrar mensajes de error

  title.textContent = 'Iniciar sesión con Google';

  // Configuración de la autenticación con Google
  const configureGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        // Redirige a la vista del muro después de la autenticación con Google
        navigateTo('/muro'); // Ajusta la ruta según la configuración de tu aplicación
      })
      .catch((error) => {
        // Manejar errores aquí
        const errorCode = error.code;
        const errorMessage = error.message;

        // Mostrar mensaje de error en el interfaz de usuario
        errorContainer.textContent = `Error al autenticar con Google: ${errorCode} - ${errorMessage}`;
      });
  };

  buttonGoogleLogin.textContent = 'Iniciar sesión con Google';
  buttonGoogleLogin.addEventListener('click', configureGoogleAuth);

  buttonReturn.textContent = 'Volver a la página de inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  section.append(title, buttonGoogleLogin, buttonReturn, errorContainer);
  return section;
}

export default googlelogin;
