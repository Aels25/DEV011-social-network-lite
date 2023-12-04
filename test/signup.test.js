// importamos la funcion que vamos a testear
import signup from '../src/vistas/signup.js';

describe('signup', () => {
  it('debería ser una función', () => {
    expect(typeof signup).toBe('function');
  });
});
