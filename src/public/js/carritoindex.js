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


document.querySelectorAll('.btn-registrar-compra').forEach(button => {
    button.addEventListener('click', () => {
        const idCarrito = button.getAttribute('data-id-carrito')
        try {
         
          fetch(`/api/compras/registrarcompra`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idCarrito })
            })

            alert('Compra realizada con exito')
            window.location.href = `/api/usuarios/libros`

            
   
        }catch (error) {
            console.error('Error:', error)
            alert('Error al registrar la compra')
        }
    })
})
