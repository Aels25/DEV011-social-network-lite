/**
 * @jest-environment jsdom
 */

import login from '../src/vistas/login.js';
import { signInWithEmailAndPassword } from '../src/lib/firebase';

jest.mock('../src/lib/firebase', () => ({
  auth: {},
  signInWithEmailAndPassword: jest.fn(),
}));

describe('login', () => {
  test('snapshot of login', () => {
    const DOM = document.createElement('div');
    DOM.append(login(() => {}));
    expect(DOM).toMatchSnapshot();
  });

  test('is a function', () => {
    expect(typeof login).toBe('function');
  });

  test('have a button Return', () => {
    const DOM = document.createElement('div');
    DOM.append(login(() => {}));
    const haveAButton = DOM.querySelector('#btnLoginReturn');
    expect(haveAButton).not.toBe(null);
  });

  test('have a button Login', () => {
    const DOM = document.createElement('div');
    DOM.append(login(() => {}));
    const haveAButton = DOM.querySelector('#btnLogin');
    expect(haveAButton).not.toBe(null);
  });

  test('button Return calls navigateTo on click', () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));
    const buttonReturn = DOM.querySelector('#btnLoginReturn');
    buttonReturn.click();
    expect(navigateTo).toHaveBeenCalledTimes(1);
    expect(navigateTo).toHaveBeenCalledWith('/');
  });

  test('form submission calls signInWithEmailAndPassword', async () => {
    const navigateTo = jest.fn();
    const DOM = document.createElement('div');
    DOM.append(login(navigateTo));
    const form = DOM.querySelector('#login-form');
    const email = DOM.querySelector('#login-inputEmail');
    const password = DOM.querySelector('#login-inputPass');

    email.value = 'test@example.com';
    password.value = 'password123';

    await form.dispatchEvent(new Event('submit'));

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'test@example.com', 'password123');
  });
});
