
document.querySelectorAll('.btn-volver-categorias').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/categorias/principal`
    })
})

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async () => {
        const idInput = document.getElementById('IDA').value

        if (idInput) {
            window.location.href = `http://localhost:8000/api/categorias/${idInput}`
        } else {
            alert('Error, ingrese el ID del producto')
        }
    })
})




// Asignar eventos a loss botones de eliminar
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-categoria')
            try {
                const response = await fetch(`http://localhost:8000/api/categorias/${id}`, {
                    method: 'DELETE'
                })
                const result = await response.json()
                alert(result.message)
                if (response.ok) {
                    window.location.href = `http://localhost:8000/api/categorias/principal`
                }
            } catch (error) {
                console.error('Error:', error)
                alert('Error al eliminar el autor')
            }
        }
    )
})