document.querySelector('.IndexLibros').addEventListener('click', async () => {
  
    window.location.href = `/api/usuarios/libros` 

})
document.querySelector('.Indexcompras').addEventListener('click', async () => {
    const email = localStorage.getItem('email')
    window.location.href = `/api/compras/usuarioCompras/${email}` 

})