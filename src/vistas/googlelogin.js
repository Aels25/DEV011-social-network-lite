// googlelogin.js
function googlelogin(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const buttonReturn = document.createElement('button');
  
    title.textContent = 'Iniciar sesión con Google';
  
    buttonReturn.textContent = 'Volver a la página de inicio';
    buttonReturn.addEventListener('click', () => {
      navigateTo('/');
    });
  
    section.append(title, buttonReturn);
    return section;
  }
  
  export default googlelogin;
  