
// Configuración de la autenticación con Google
import { auth, googleProvider, signInWithPopup } from "./firebase";


document.getElementById("google-auth-btn").addEventListener("click", () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // El usuario ha iniciado sesión correctamente
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
    })
    .catch((error) => {
      // Manejar errores aquí
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al autenticar con Google:", errorCode, errorMessage);
    });
});
