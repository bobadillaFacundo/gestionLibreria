
document.querySelectorAll('.btn-volver-libros').forEach(button => {
    button.addEventListener('click', () => {
        const id = localStorage.getItem('email')
        window.location.href = `/api/autores/principal/${id}`
    })
})

document.querySelectorAll('.btn-volver-gestion').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
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
document.querySelector('.Indexcompras').addEventListener('click', async () => {
        window.location.href = `/api/libros/${idInput}` 
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


