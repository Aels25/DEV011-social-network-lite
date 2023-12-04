// home.js

function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonLogin = document.createElement('button');
  const buttonSignUp = document.createElement('button');
  const buttonGoogleLogin = document.createElement('button');

  buttonLogin.id = 'btnLogin';
  buttonSignUp.id = 'btnSignUp';
  buttonGoogleLogin.id = 'btnGoogleLogin'; // Asigna un ID único para el botón de inicio de sesión con Google

  title.textContent = 'BIENVENIDO A LA WANDERWEB';

  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.addEventListener('click', () => {
    navigateTo('/login');
  });

  buttonSignUp.textContent = 'Crear cuenta nueva';
  buttonSignUp.addEventListener('click', () => {
    navigateTo('/signup');
  });

  buttonGoogleLogin.textContent = 'Iniciar sesión con Google';
  // Agrega un manejador de eventos al nuevo botón de Google
  buttonGoogleLogin.addEventListener('click', () => {
    navigateTo('/googlelogin'); // Redirige a la nueva vista de Google Login
  });

  section.append(title, buttonLogin, buttonSignUp, buttonGoogleLogin);
  return section;
}

export default home;
