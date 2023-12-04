/**
 * @jest-environment jsdom
 */

import signup from '../src/vistas/signup.js'; // Ajusta la ruta según tu estructura de archivos
import { createUserWithEmailAndPassword } from '../src/lib/firebase'; // Importa las funciones necesarias de Firebase

jest.mock('../src/lib/firebase', () => ({
  auth: {},
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('signup', () => {
  test('snapshot of signup', () => {
    const DOM = document.createElement('div');
    DOM.append(signup(() => {}));
    expect(DOM).toMatchSnapshot();
  });

  test('is a function', () => {
    expect(typeof signup).toBe('function');
  });

  test('have a button Return', () => {
    const DOM = document.createElement('div');
    DOM.append(signup(() => {}));
    const haveAButton = DOM.querySelector('#btnReturn');
    expect(haveAButton).not.toBe(null);
  });

  test('have a button Signup', () => {
    const DOM = document.createElement('div');
    DOM.append(signup(() => {}));
    const haveAButton = DOM.querySelector('#btnSignup');
    expect(haveAButton).not.toBe(null);
  });

  test('button Return calls navigateTo on click', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(signup(navigateTo));
    const buttonReturn = DOM.querySelector('#btnReturn');
    buttonReturn.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/');
  });

  test('form submission calls createUserWithEmailAndPassword', async () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(signup(navigateTo));
    const form = DOM.querySelector('#signup-form');
    const email = DOM.querySelector('#inputEmail');
    const password = DOM.querySelector('#inputPass');

    email.value = 'test@example.com';
    password.value = 'password123';

    await form.dispatchEvent(new Event('submit'));

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password123');
  });
});
