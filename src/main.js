// main.js
import home from './vistas/home.js';
import login from './vistas/login.js';
import signup from './vistas/signup.js';
import googlelogin from './vistas/googlelogin.js';
import error from './vistas/error.js';
import muro from './vistas/muro.js';

const routes = [
  { path: '/', component: home },
  { path: '/login', component: login },
  { path: '/signup', component: signup },
  { path: '/googlelogin', component: googlelogin }, // Agrega la nueva ruta de Google Login
  { path: '/error', component: error },
  { path: '/muro', component: muro },
];

const defaultRoute = '/';
const root = document.getElementById('root');

const navigateTo = (hash) => {
  const route = routes.find((routeFound) => routeFound.path === hash);

  if (route && route.component) {
    window.history.pushState(
      {},
      route.path,
      window.location.origin + route.path,
    );

    if (root.firstChild) {
      root.removeChild(root.firstChild);
    }
    root.appendChild(route.component(navigateTo));
  } else {
    navigateTo('/error');
  }
};

window.onpopstate = () => {
  navigateTo(window.location.pathname);
};

navigateTo(window.location.pathname || defaultRoute);
