
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/libros/principal`
    })
})

document.querySelector('.buscarLibro').addEventListener('click', async () => {
    const idInput = document.getElementById('IDL').value;
    if (idInput) {
        window.location.href = `http://localhost:8000/api/libros/${idInput}`;
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

document.querySelectorAll('.btn-createautor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/autores/crud`

    })
})

document.querySelectorAll('.btn-createcategoria').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/categorias/crud`

    })
})

document.querySelectorAll('.btn-createlibro').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/libros/crud`

    })
})


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formC')

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita la recarga del formulario

        // Crear el objeto de datos con los valores del formulario
        const data = {
            titulo: document.getElementById('titulo').value,
            descripcion: document.getElementById('descripcion').value,
            autor: document.getElementById('autor').value,
            precio: document.getElementById('precio').value,
            cantidad: document.getElementById('cantidad').value,
            categorias: document.getElementById('categorias').value
        };

        try {
            const response = await fetch('http://localhost:8000/api/libros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json()

            if (response.ok) {
                // Si la operación fue exitosa, mostrar un alert con el mensaje
                alert(result.message) // Mostrar el mensaje de éxito
                form.reset() // Limpiar el formulario si es necesario
                location.reload();

            } else {
                // Si hay un error, mostrar el mensaje de error
                alert(result.message)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al crear el libro')
        }
    })
})
