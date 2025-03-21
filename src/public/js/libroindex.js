
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})


document.querySelectorAll('.sesion').forEach(button => {
    button.addEventListener('click', () => {
        localStorage.removeItem('email')
        window.location.href = `/api/login/principal`
    })
})
document.querySelector('.buscarLibro').addEventListener('click', async () => {
    const idInput = document.getElementById('IDLFINAL').value 
    if (idInput) {
        window.location.href = `/api/libros/${idInput}` 
    } else {
        alert('Error, ingrese el nombre del libro') 
    }
})

document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-libro')
        try {
            const response = await fetch(`/api/libros/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()

            if (response.ok) {
                alert("Libro eliminado con exito")
                window.location.href = `/api/libros/principalGestion`
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al eliminar el autor')
        }
    }
    )
})

document.querySelectorAll('.btn-categorias').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/categorias/principal`

    })
})

document.querySelectorAll('.btn-createautor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/autores/crud`

    })
})

document.querySelectorAll('.btn-createcategoria').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/categorias/crud`

    })
})

document.querySelectorAll('.btn-createlibro').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/libros/crud`

    })
})

document.querySelectorAll('.btn-autor').forEach(button => {
    button.addEventListener('click', async () => {
        const email = localStorage.getItem('email') 
        window.location.href = `/api/autores/principal/${email}`

    })
})

document.querySelectorAll('.btn-volver-gestion').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/usuarios/gestion`

    })
})

document.querySelector('.perfil').addEventListener('click', async () => {
    const usuario = localStorage.getItem('email') 
    window.location.href = `/api/usuarios/perfil/${usuario}` 
})

document.querySelector('.carrito').addEventListener('click', async () => {
    const usuario = localStorage.getItem('email') 
    window.location.href = `/api/carritos/principal/${usuario}` 
})

document.querySelectorAll('.btn-comprarLibro').forEach(button => {
    button.addEventListener('click', async () => {
            const usuario = localStorage.getItem('email')
    if (!usuario) {
        alert("No hay usuario registrado. Inicia sesión primero.")
        return
    }
    
    const libro = button.getAttribute('data-id-Libro')
    if (!libro) {
        alert("El libro no tiene un ID válido.")
        return
    }

    try {
        const respuesta = await fetch(`/api/carritos/agregarCarrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: usuario, libro: libro })
        })

        const resultado = await respuesta.json()
        if (respuesta.ok) {
            alert(` ${resultado.mensaje}`)
        } else {
            alert(`Error: ${resultado.error}`)
        }
    } catch (error) {
        console.error("Error:", error)
        alert("Hubo un problema al procesar la petición.")
    }
})
})
