
document.querySelectorAll('.btn-volver-autores').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/autores/principal`
    })
})

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async () => {
        const idInput = document.getElementById('IDA').value

        if (idInput) {
            window.location.href = `http://localhost:8000/api/autores/${idInput}`
        } else {
            alert('Error, nombre de autor')
        }
    })
})

// Asignar eventos a loss botones de eliminar
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-autor')
        try {
            const response = await fetch(`http://localhost:8000/api/autores/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()
            alert(result.message)
            if (response.ok) {
                window.location.href = `http://localhost:8000/api/autores/principal`
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

document.querySelectorAll('.buttonCrearAutor').forEach(button => {
    button.addEventListener('click', async () => {

        event.preventDefault()
        const data = {
            nombre: document.getElementById('Nombre').value,
            edad: document.getElementById('Edad').value
        }

        try {
            const result = await fetch('http://localhost:8000/api/autores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            document.getElementById('formC').reset()
            alert('Autor creado con exito', result)
        } catch (error) {
            console.error('Error:', error)
            alert('Error al crear el autor')
        }
    })
})
