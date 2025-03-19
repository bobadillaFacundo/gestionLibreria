
document.querySelectorAll('.btn-delete-categoria').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-categoria')
        try {
            const response = await fetch(`http://localhost:8000/api/categorias/${id}`, {
                method: 'DELETE'
            })
            await response.json()
            if (response.ok) {
                alert("Categoria eliminada con exito")
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
        window.location.href = `http://localhost:8000/api/usuarios/gestion`
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
            location.reload();

        } catch (error) {
            console.error('Error:', error)
            alert('Error al crear la categoria')
        }
    })
})