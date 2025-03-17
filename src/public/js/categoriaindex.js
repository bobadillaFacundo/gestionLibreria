
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

document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/libros/principal`
    })
})


document.querySelectorAll('.buttonCrearCategoria').forEach(button => {
    button.addEventListener('click', async () => {

        event.preventDefault()
        const data = {
            nombre: document.getElementById('Nombre').value,
        }

        try {
            const result = await fetch('http://localhost:8000/api/categorias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            document.getElementById('formC').reset()
            alert('Categoria creado con exito', result)
        } catch (error) {
            console.error('Error:', error)
            alert('Error al crear la categoria')
        }
    })
})