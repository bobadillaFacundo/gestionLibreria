document.querySelectorAll('.btn-volver-carrito').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })    
})