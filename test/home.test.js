/**
 * @jest-environment jsdom
 */

import home from '../src/vistas/home.js'; // Ajusta la ruta según tu estructura de archivos

describe('home', () => {
  test('snapshot of home', () => {
    const DOM = document.createElement('div');
    DOM.append(home(() => {}));
    expect(DOM).toMatchSnapshot();
  });

  test('is a function', () => {
    expect(typeof home).toBe('function');
  });

  test('have a button Login', () => {
    const DOM = document.createElement('div');
    DOM.append(home(() => {}));
    const haveAButton = DOM.querySelector('#btnLogin');
    expect(haveAButton).not.toBe(null);
  });

  test('have a button SignUp', () => {
    const DOM = document.createElement('div');
    DOM.append(home(() => {}));
    const haveAButton = DOM.querySelector('#btnSignUp');
    expect(haveAButton).not.toBe(null);
  });

  test('have a button GoogleLogin', () => {
    const DOM = document.createElement('div');
    DOM.append(home(() => {}));
    const haveAButton = DOM.querySelector('#btnGoogleLogin');
    expect(haveAButton).not.toBe(null);
  });

  test('button Login calls navigateTo on click', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(home(navigateTo));
    const buttonLogin = DOM.querySelector('#btnLogin');
    buttonLogin.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/login');
  });

  test('button SignUp calls navigateTo on click', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(home(navigateTo));
    const buttonSignUp = DOM.querySelector('#btnSignUp');
    buttonSignUp.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/signup');
  });

  test('button GoogleLogin calls navigateTo on click', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(home(navigateTo));
    const buttonGoogleLogin = DOM.querySelector('#btnGoogleLogin');
    buttonGoogleLogin.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/googlelogin');
  });
});
