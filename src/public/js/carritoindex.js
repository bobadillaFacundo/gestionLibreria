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
    button.addEventListener('click', async () => {
        const email = localStorage.getItem('email') // Corregido "emial" a "email"

        try {
            const result = await fetch(`/api/carritos/buscarMontoCarrito`, { // Se agrega await
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })

            if (!result.ok) {
                throw new Error('Error al obtener el monto del carrito')
            }
            
            const data = await result.json() // Se espera la respuesta correctamente
            const monto = data.carritoMonto // Ajusta esto según la estructura de la API

            window.location.href = `/api/mercadopago/mostrarPagar/${monto}`
        } catch (error) {
            console.error('Hubo un error:', error)
        }
    })
})
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btn-delete-libro-carrito').forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id-libro-del-carrito');
            try {
                const response = await fetch(`/api/carritos/eliminarLibro`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id, email: localStorage.getItem('email') })
                })

                if (response.ok) {
                    alert("Libro eliminado con éxito")
                    location.reload()
                } else {
                    const errorData = await response.json().catch(() => ({})) // Evita error si no es JSON
                    alert(errorData.message || "Error al eliminar el libro")
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el libro')
            }
        })
    })
})
