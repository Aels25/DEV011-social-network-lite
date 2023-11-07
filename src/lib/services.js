// Esta función debería borrar todos los datos del almacenamiento local
export const init = () => {
  localStorage.clear();
}

// Esta función debería devolver true si el usuario existe
// Debería devolver false si el usuario no existe
export const login = (email, password) => {
  const usersStr = localStorage.getItem("users");
  if(usersStr){
    const users = JSON.parse(usersStr);
    const user = users.find(user => user.email === email && user.password === password);
    if(user){
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
  }
  return false;
}

// Esta función debería devolver al usuario que ha iniciado sesión
// Debería devolver null si no hay usuario iniciado sesión
export const getLoggedInUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

// Esta función debería cerrar la sesión del usuario
export const logout = () => {
  localStorage.removeItem("user");
}

// Esta función debería registrar a un nuevo usuario
// Debería devolver true si el usuario se registró con éxito
// Debería lanzar un error si el usuario ya existe
export const register = (email, password) => {
  // Verificar la expresión regular del correo electrónico
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailRegex.test(email)){
    throw new Error("Correo electrónico no válido");
  }

  // Verificar la longitud de la contraseña
  if(password.length < 6){
    throw new Error("La contraseña debe tener al menos 6 caracteres");
  }

  // Verificar si el usuario ya existe
  let users = [];
  const usersStr = localStorage.getItem("users");
  if(usersStr){
    users = JSON.parse(usersStr);
  }
  const user = users.find(user => user.email === email);
  if(user){
    throw new Error("El usuario ya existe");
  }
  else{
    users.push({email, password});
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  }
}

// Esta función debería devolver un array de posts
// Cada post debería tener la siguiente estructura:
// {
//   id: string,
//   content: string,
//   email: string
// }
export const getPosts = () => {
  const postsStr = localStorage.getItem("posts");
  return postsStr ? JSON.parse(postsStr) : [];
}

// Esta función debería crear un nuevo post y devolver su id
// El post debería tener la siguiente estructura:
// {
//   id: string,
//   content: string,
//   email: string
// }
export const createPost = (content, email) => {
  // Verificar la longitud del contenido
  if(content.length < 1){
    throw new Error("El contenido debe tener al menos 1 carácter");
  }

  // Verificar la expresión regular del correo electrónico
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!emailRegex.test(email)){
    throw new Error("Correo electrónico no válido");
  }

  const id = Math.random().toString(36).substr(2, 9);
  let posts = [];
  const postsStr = localStorage.getItem("posts");
  if(postsStr){
    posts = JSON.parse(postsStr);
  }
  posts.push({id, content, email});
  localStorage.setItem("posts", JSON.stringify(posts));
  return id;
}

// Esta función debería editar el contenido de un post
// Debería lanzar un error si el post no existe
export const editPost = (idPost, content) => {
  // Verificar la longitud del contenido
  if(content.length < 1){
    throw new Error("El contenido debe tener al menos 1 carácter");
  }

  const postsStr = localStorage.getItem("posts");
  if(postsStr){
    const posts = JSON.parse(postsStr);
    const post = posts.find(post => post.id === idPost);
    if(post){
      post.content = content;
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    else{
      throw new Error("El post no existe");
    }
  }
  else{
    throw new Error("El post no existe");
  }
}

// Esta función debería eliminar un post
// Debería lanzar un error si el post no existe
export const deletePost = (idPost) => {
  const postsStr = localStorage.getItem("posts");
  if(postsStr){
    const posts = JSON.parse(postsStr);
    const post = posts.find(post => post.id === idPost);
    if(post){
      const index = posts.indexOf(post);
      posts.splice(index, 1);
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    else{
      throw new Error("El post no existe");
    }
  }
  else{
    throw new Error("El post no existe");
  }
}
export const myFunction = () => {
  // lógica de myFunction
};