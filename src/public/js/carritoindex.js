document.querySelectorAll('.btn-volver-carrito').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })    
})


document.querySelectorAll('.btn-volver-gestion').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})

