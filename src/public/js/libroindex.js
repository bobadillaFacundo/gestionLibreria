
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/libros/principal`
    })
})

document.querySelector('.btn-buscar').addEventListener('click', async () => {
    const idInput = document.getElementById('IDL').value.trim()
    if (idInput) {     
        window.location.hrsef = `http://localhost:8000/api/libros/${idInput}`;
    } else {
        alert('Error, ingrese el nombre del libro');
    }
})


document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-libro')
        try {
            const response = await fetch(`http://localhost:8000/api/libros/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            alert(result.message)
            if (response.ok) {
                window.location.href = `http://localhost:8000/api/libros/principal`
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
        window.location.href = `http://localhost:8000/api/categorias/principal`

    })
})

document.querySelectorAll('.btn-autor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/autores/principal`

    })
})