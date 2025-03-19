document.querySelector('.buttonCrearUsuario').addEventListener('click', async () => {
  
        window.location.href = `http://localhost:8000/api/usuarios/usuariosCrear`;
   
})

document.querySelector('.Index').addEventListener('click', async () => {
  
    window.location.href = `http://localhost:8000/api/usuarios/gestion`;

})
