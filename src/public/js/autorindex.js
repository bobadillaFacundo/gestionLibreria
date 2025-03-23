

document.querySelectorAll('.btn-volver-autores').forEach(button => {
    button.addEventListener('click', () => {
        const email = localStorage.getItem('email')
        window.location.href = `/api/autores/principal/${email}`
    })
})
document.querySelectorAll('.Usuario').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })
})

document.querySelectorAll('.btn-volver-libroUsuario').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })
})
document.querySelectorAll('.btn-volver-autores-usuario').forEach(button => {
    button.addEventListener('click', () => {
        const email = localStorage.getItem('email')
        window.location.href = `/api/autores/principal/${email}`
    })
})
document.querySelectorAll('.btn-volver-gestion').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
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
                location.reload() 

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
                location.reload() 

            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al eliminar el autor')
        }
    }
    )
})

document.querySelectorAll('.btn-volver-libro').forEach(button => {
    console.log(button); // Verifica si los botones se encuentran correctamente
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})


document.querySelectorAll('.buttonCrearAutor').forEach(button => {
    button.addEventListener('click', async (event) => {
        event.preventDefault() // Se previene el comportamiento por defecto

        const data = {
            nombre: document.getElementById('Nombre').value,
            edad: document.getElementById('Edad').value
        };

        try {
            const response = await fetch('/api/autores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json()
            
            if (response.ok) {
                alert("Autor creado con exito")
                document.getElementById('formCA').reset()
            } else {
                alert(result.message)
            }
            
        } catch (error) {
            console.log('Error:', error)
            alert('Error al crear el autor')
        }
    })
})


document.querySelectorAll('.btn-primary-buscar').forEach(button => {
    button.addEventListener('click', async () => {
        const idInput = document.getElementById('IDA').value
        const usuarioInput = localStorage.getItem('email')
        if (idInput) {
            window.location.href = `/api/autores/autor/${idInput}/${usuarioInput}`
        } else {
            alert('Error, nombre de autor')
        }
    })
})

document.querySelector('.buscarLibroUsuario').addEventListener('click', async () => {
    const idInput = document.getElementById('IDAA').value 
    
    if (idInput) {
        window.location.href = `/api/autores/usuario/${idInput}` 
    } else {
        alert('Error, ingrese el nombre del autor') 
    }
})