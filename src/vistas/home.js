// file home.js
function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('button');

  title.textContent = 'Welcome to my project';

  button.textContent = 'Ir a login';
  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  section.append(title, button);
  return section;
}

export default home;
