
document.querySelectorAll('.btn-volver-categorias').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/libros/principal`
    })
})

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async () => {
        const idInput = document.getElementById('IDL').value

        if (idInput) {
            window.location.href = `http://localhost:8000/api/libros/${idInput}`
        } else {
            alert('Error, ingrese el ID del producto')
        }
    })
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