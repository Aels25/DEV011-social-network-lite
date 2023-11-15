// Importa los elementos necesarios de Firebase
import { auth, googleProvider, signInWithPopup } from '../lib/firebase';

function googlelogin(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const buttonGoogleLogin = document.createElement('button');

  title.textContent = 'Iniciar sesión con Google';

  // Configuración de la autenticación con Google
  const configureGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // El usuario ha iniciado sesión correctamente
        const user = result.user;
        console.log('Usuario autenticado con Google:', user);

        // Aquí puedes realizar acciones adicionales después de la autenticación
        // Por ejemplo, podrías redirigir a otra página o realizar alguna acción específica
      })
      .catch((error) => {
        // Manejar errores aquí
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al autenticar con Google:', errorCode, errorMessage);
      });
  };

  buttonGoogleLogin.textContent = 'Iniciar sesión con Google';
  buttonGoogleLogin.addEventListener('click', configureGoogleAuth);

  buttonReturn.textContent = 'Volver a la página de inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  section.append(title, buttonGoogleLogin, buttonReturn);
  return section;
}

export default googlelogin;
