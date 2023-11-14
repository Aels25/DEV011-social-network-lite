// signup.js
function signup(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const buttonReturn = document.createElement('button');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const buttonSignup = document.createElement('button');

  inputEmail.placeholder = 'Write email';
  inputPass.placeholder = 'Create a password';

  title.textContent = 'Crear cuenta nueva';
  buttonSignup.textContent = 'Registrarse';

  buttonReturn.textContent = 'Volver a la página de inicio';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  form.append(inputEmail, inputPass, buttonSignup);
  section.append(title, form, buttonReturn);

  return section;
}

export default signup;
