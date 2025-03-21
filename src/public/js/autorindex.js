

document.querySelectorAll('.btn-volver-autores').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})

document.querySelectorAll('.btn-volver-libroUsuario').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })
})
document.querySelectorAll('.btn-volver-autores-usuario').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })
})
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async () => {
        const idInput = document.getElementById('IDA').value

        if (idInput) {
            window.location.href = `/api/autores/${idInput}`
        } else {
            alert('Error, nombre de autor')
        }
    })
})

// Asignar eventos a loss botones de eliminar
document.querySelectorAll('.btn-delete-libro').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-libro')
        try {
            const response = await fetch(`/api/libros/${id}`, {
                method: 'DELETE'
            })
            await response.json()
            if (response.ok) {
                alert("Libro eliminado con exito")
                location.reload();

            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al eliminar el autor')
        }
    }
    )
})
// Asignar eventos a loss botones de eliminar
document.querySelectorAll('.btn-delete-autor').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-autor')
        try {
            const response = await fetch(`/api/autores/${id}`, {
                method: 'DELETE'
            })
           await response.json()

            if (response.ok) {
                alert("Autor eliminado con exito")
                location.reload();

            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al eliminar el autor')
        }
    }
    )
})
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})

document.querySelectorAll('.buttonCrearAutor').forEach(button => {
    button.addEventListener('click', async () => {

        event.preventDefault()
        const data = {
            nombre: document.getElementById('Nombre').value,
            edad: document.getElementById('Edad').value
        }

        try {
             await fetch('/api/autores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            alert('Autor creado con exito')
            location.reload();

        } catch (error) {
            console.error('Error:', error)
            alert('Error al crear el autor')
        }
    })
})
