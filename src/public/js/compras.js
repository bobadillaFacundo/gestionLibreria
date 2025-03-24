document.querySelectorAll('.btn-volver-gestion').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})
document.querySelector('.btn-volver-libros').addEventListener('click', async () => {
  
    window.location.href = `/api/usuarios/libros` 

})